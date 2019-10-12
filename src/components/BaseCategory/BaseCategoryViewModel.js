class BaseCategoryViewModel {
    constructor(store, categoryId, history) {
        this.store = store;
        this.categoryId = categoryId;
        let that = this;
        this.store.loadCategory(this.categoryId, function() {
            that.history.push("/login")
        });
        this.history = history;
    }

    getCategory(){
        switch(this.categoryId){
            case "OuIgC88Oop83yI5VJSXR": return "Action";
            case "LXVOVsEETPResUbqdxRc": return "Adventure";
            case "ZN5WKSkJdk7NwepO7wUH": return "Combat";
            case "67aYleyLQivRZOdWhwQM": return "Sports";
            case "nFpjE2g6CbXN67emqdbm": return "Strategy";
            case "Wd5MXgbMRfexaaIFkpnt": return "Miscellaneous";
            default: return "";
        }
    }

    getArray() {
        return this.store.getArray(this.categoryId)
    }

    viewProduct(item) {
        this.history.push("/view/" + item.id)
    }
}

export default BaseCategoryViewModel