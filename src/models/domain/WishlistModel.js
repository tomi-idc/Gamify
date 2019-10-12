import {action, observable} from "mobx";
import handleErrors from "./HandleErrors";

class WishlistModel {
    @observable categories = []

    constructor(authModel) {
        this.authModel = authModel
    }

    @action loadWishlist(callback) {
        let that = this
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/get_wishlist/" + userId, {
                method: "GET",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            }).then(response => handleErrors(response, callback))
                .then(response => {
                    if(response) {
                        that.categories = response.items
                    }
                })
        })
    }

    @action removeItem(item, callback) {
        let index = this.categories.indexOf(item);
        if (index > -1) {
            let item = this.categories[index]
            this.categories.splice(index, 1)
            this.authModel.getUserId(userId => {
                fetch("http://localhost:3000/api/remove_from_wishlist/" + userId, {
                    method: "POST",
                    body: JSON.stringify({ id: item.id }),
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'}
                }).then(response => handleErrors(response, callback))
                    .then(response => {
                    })
            })
        }
    }

    getArray() {
        return this.categories
    }
}

export default WishlistModel