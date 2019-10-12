import { observable, action } from 'mobx'
import handleErrors from './HandleErrors';

class CartModel {
    @observable items = [];
    @observable totalBill = 0;
    @observable totalItems = 0;
    @observable message = "";

    constructor(authModel, userModel) {
        this.authModel = authModel
        this.userModel = userModel
    }

    @action clearMessage() {
        this.message = "";
    }

    @action onViewModelCreated(errorCallback) {
        let that = this
        this.authModel.getUserId(function (userId) {
            fetch("http://localhost:3000/api/get_cart/" + userId, {
                method: "GET",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, errorCallback))
                .then(response => {
                    if (response) {
                        that.items = response.items
                        that.updateTotalProperties(response.items)
                    }
                })
        });
    }

    updateCart(fn, errorCallback) {
        fn()
    }

    updateTotalProperties(items) {
        let countPerItem = items.map(item => item.quantity)
        let pricePerItem = items.map(item => item.price)
        let totalBill = 0
        let totalItems = 0
        for (let i = 0; i < pricePerItem.length; i++) {
            totalItems += countPerItem[i]
            totalBill += countPerItem[i] * pricePerItem[i]
        }
        this.totalBill = totalBill
        this.totalItems = totalItems
    }

    @action increaseQuantity(item) {
        let index = this.items.indexOf(item);
        this.items[index].quantity++;
        this.userModel.incrementCart()
        this.updateTotalProperties(this.items)
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/add_to_cart/" + userId + "/" + item.id, {
                method: "PUT",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, null))
                .then(_ => { })
        })
    }

    @action decreaseQuantity(item) {
        let index = this.items.indexOf(item);
        if (this.items[index].quantity > 1) {
            this.items[index].quantity -= 1;
            this.userModel.decrementCart()
            this.updateTotalProperties(this.items)
            this.authModel.getUserId(userId => {
                fetch("http://localhost:3000/api/decrement_from_cart/" + userId + "/" + item.id, {
                    method: "PUT",
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => handleErrors(response, null))
                    .then(_ => { })
            })
        }
    }

    @action removeItem(item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            let item = this.items[index]
            this.userModel.decreaseCart(item.quantity)
            this.items.splice(index, 1);
            this.updateTotalProperties(this.items)
            this.authModel.getUserId(userId => {
                fetch("http://localhost:3000/api/remove_from_cart/" + userId + "/" + item.id, {
                    method: "DELETE",
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => handleErrors(response, null))
                    .then(_ => { })
            })
        }
    }

    buyProducts(obj, fn, errorCallback) {
        let street = obj.street
        let city = obj.city
        let country = obj.country
        let zipcode = obj.zipcode
        if (street == '' || city == '' || country == '' || zipcode == '') {
            this.message = "*Please fill out all missing details."
            return
        }
        this.authModel.getUserId(userId => {
            let itemsArr = this.items.map(item => {
                return { id: item.id, quantity: item.quantity }
            });
            let json = { user_id: userId, items: itemsArr, street: street, city: city, country: country, zipcode: zipcode };
            fetch("http://localhost:3000/api/buy_products/", {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(json),
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, errorCallback))
                .then(_ => {
                    fn()
                })
        })
    }
}

export default CartModel