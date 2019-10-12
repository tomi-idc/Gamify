class SearchViewModel {
    constructor(store, categoryId, history) {
        this.store = store;
        this.categoryId = categoryId;
        this.history = history;
        this.loadCategory(categoryId);
    }

    loadCategory(categoryId) {
        let that = this
        this.store.loadCategory(categoryId, function() {
            that.history.push("/login")
        });
    }

    getCategory() {
        return null
    }

    getArray() {
        return this.store.getArray(this.categoryId)
    }

    viewProduct(item) {
        this.history.push("/view/" + item.id)
    }
}

export default SearchViewModel