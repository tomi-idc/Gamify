class CheckoutViewModel {
    constructor(cartModel, userModel, history) {
        this.cartStore = cartModel
        this.userStore = userModel
        this.history = history
        this.cartStore.clearMessage()
        this.cartStore.onViewModelCreated(function() {
            history.push("/login")
        })
    }

    getCartItems() {
        return this.cartStore.items
    }

    getTotalBill() {
        return this.cartStore.totalBill
    }

    getTotalItems() {
        return this.cartStore.totalItems
    }

    getEmail() {
        return this.userStore.user.email || ''
    }

    getMessage() {
        return this.cartStore.message
    }

    buyProducts(obj) {
        let that = this;
        this.cartStore.buyProducts(obj, function() {
            that.history.push("/")
        }, function() {
            that.history.push("/login")
        })
    }
}

export default CheckoutViewModel