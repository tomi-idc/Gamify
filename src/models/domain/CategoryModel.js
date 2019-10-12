import { action, observable } from "mobx";
import handleErrors from "./HandleErrors";

class CategoryModel {
    @observable categories = {}

    @action loadCategory(categoryId, errorCallback) {
        if (this.categories[categoryId] !== undefined) {
            return
        }
        fetch("http://localhost:3000/api/get_category/" + categoryId, {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => handleErrors(response, errorCallback))
            .then(response => {
                if(response) {
                    this.categories[categoryId] = response.items
                }
            })
    }

    getArray(categoryId) {
        return this.categories[categoryId]
    }
}

export default CategoryModel