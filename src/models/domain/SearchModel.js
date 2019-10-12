import {action, observable} from "mobx";
import handleErrors from "./HandleErrors";

class SearchModel {
    @observable categories = []

    @action loadCategory(searchTerm, callback) {
        fetch("http://localhost:3000/api/search/" + encodeURIComponent(searchTerm), {
            method: "GET",
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        }).then(response => handleErrors(response, callback))
            .then(response => {
                if(response) {
                    this.categories = response.items
                }
            })
    }

    getArray(categoryId) {
        return this.categories
    }
}

export default SearchModel