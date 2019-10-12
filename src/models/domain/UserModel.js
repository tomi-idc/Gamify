import { action, observable } from "mobx";
import handleErrors from "./HandleErrors";

class UserModel {
    @observable user = {}
    @observable cartItemsCount = 0

    constructor(authModel) {
        this.authModel = authModel
    }

    @action loadUser(callback) {
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/user/" + userId, {
                method: "GET",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => handleErrors(response, callback))
                .then(response => {
                    if (response) {
                        this.user = response.user
                        this.cartItemsCount = response.user.cart_games
                    }
                })
        })
    }

    @action incrementCart() {
        if (this.user == {}) {
            return
        }
        this.cartItemsCount++
    }

    @action decrementCart() {
        if (this.user == {}) {
            return
        }
        this.cartItemsCount--
    }

    @action decreaseCart(amount) {
        if (this.user == {}) {
            return
        }
        this.cartItemsCount -= amount
    }

    logOut(callback) {
        this.authModel.getUserId(userId => {
            fetch("http://localhost:3000/api/sign_out/", {
                method: "POST",
                body: JSON.stringify({ id: userId }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json())
                .then(response => {
                    callback()
                })
        })
    }
}

export default UserModel