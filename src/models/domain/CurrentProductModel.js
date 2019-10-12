import { observable, action } from 'mobx'
import handleErrors from './HandleErrors';

class CurrentProductModel {
    @observable item = null;
    @observable errorMessage = "";

    constructor(authModel, userModel) {
        this.authModel = authModel
        this.userModel = userModel
    }

    @action loadProduct(productId, callback) {
        fetch("http://localhost:3000/api/game/" + productId, {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => handleErrors(response, callback))
            .then(response => {
                if (response) {
                    if(response.result == "ok") {
                    this.item = response.item
                } else {
                    this.errorMessage = "Game not found"
                }
                }
            })
    }

    getItem() {
        return this.item
    }

    buyCurrentProduct(fn, errorCallback) {
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/add_to_cart/" + userId + "/" + this.item.id, {
                method: "PUT",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, errorCallback))
                .then(_ => {
                    fn()
                })
        });
    }

    addCurrentProductToCart(callback) {
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/add_to_cart/" + userId + "/" + this.item.id, {
                method: "PUT",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, callback))
                .then(_ => {
                    this.userModel.incrementCart()
                })
        })
    }

    addCurrentProductToWishlist(fn, errorCallback) {
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/add_to_wishlist/" + userId + "/" + this.item.id, {
                method: "PUT",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, errorCallback))
                .then(_ => {
                    fn()
                })
        })
    }
}

export default CurrentProductModel