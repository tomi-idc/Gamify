class CartViewModel {
    constructor(store, history) {
        this.store = store;
        this.history = history;
        let that = this
        this.store.onViewModelCreated(function() {
            that.history.push("/login")
        })
    }

    getCartItems() {
        return this.store.items
    }

    getTotalBill() {
        return this.store.totalBill
    }

    getTotalItems() {
        return this.store.totalItems
    }

    increaseQuantity(item) {
        this.store.increaseQuantity(item)
    }

    decreaseQuantity(item) {
        this.store.decreaseQuantity(item)
    }

    removeItem(item) {
        this.store.removeItem(item)
    }

    updateCart() {
        let that = this;
        this.store.updateCart(function() {
            that.history.push("/checkout")
        }, function() {
            that.history.push("/login")
        })
    }
}

export default CartViewModel