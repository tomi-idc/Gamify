import { action, observable } from "mobx";
import handleErrors from "./HandleErrors";

class UserModel {
    @observable items = []
    allItems = []

    constructor(authModel) {
        this.authModel = authModel
    }

    @action getItems(email, callback) {
        if (!email) {
            email = ''
        }
        fetch("http://localhost:3000/api/get_activities/" + email, {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => handleErrors(response, callback))
            .then(response => {
                if (response) {
                    this.items = response.items.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    this.allItems = JSON.parse(JSON.stringify(response)).items
                }
            })
    }

    filterByEmail(email) {
        if (email === "") {
            this.items = this.allItems.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        } else {
            let lowercaseEmail = email.toLowerCase()
            this.items = this.allItems.filter(item => item.email.toLowerCase().includes(lowercaseEmail)).sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        }
    }
}

export default UserModel