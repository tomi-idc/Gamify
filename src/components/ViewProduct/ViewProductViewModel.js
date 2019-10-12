class ViewProductViewModel {
    constructor(store, productId, history) {
        this.store = store;
        this.history = history;
        this.store.loadProduct(productId, function () {
            history.push("/login")
        })
    }

    getItem() {
        return this.store.getItem()
    }

    getErrorMessage() {
        return this.store.errorMessage
    }

    buyCurrentProduct() {
        let that = this;
        this.store.buyCurrentProduct(function () {
            that.history.push("/cart");
        }, function () {
            that.history.push("/login")
        })
    }

    addCurrentProductToCart() {
        let that = this
        this.store.addCurrentProductToCart(function () {
            that.history.push("/login")
        })
    }

    addCurrentProductToWishlist() {
        let that = this;
        this.store.addCurrentProductToWishlist(function () {
            that.history.push("/")
        }, function () {
            that.history.push("/login")
        })
    }
}

export default ViewProductViewModel