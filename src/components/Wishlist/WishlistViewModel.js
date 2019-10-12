class WishlistViewModel {
    constructor(store, history) {
        this.store = store;
        this.history = history;
        this.store.loadWishlist(function() {
            history.push("/login")
        });
    }

    getCategory() {
        return "Wishlist"
    }

    getArray() {
        return this.store.getArray()
    }

    viewProduct(item) {
        this.history.push("/view/" + item.id)
    }

    removeItem(item) {
        let that = this
        this.store.removeItem(item, function() {
            that.history.push("/login")
        })
    }
}

export default WishlistViewModel