class NavBarViewModel {
    constructor(store, showNavBar, history) {
        this.store = store;
        this.history = history;
        if (showNavBar) {
            store.loadUser(function () {
                history.push("/login")
            })
        }
    }

    getUser() {
        return this.store.user
    }

    getCartItemsCount() {
        return this.store.cartItemsCount
    }

    logOut() {
        let that = this
        this.store.logOut(function () {
            that.history.push("/login")
        })
    }
}

export default NavBarViewModel