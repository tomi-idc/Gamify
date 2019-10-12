class AdminViewModel {
    constructor(loginStore, history) {
        this.store = loginStore;
        this.history = history;
        this.store.getItems(null, function () {
            history.push("/login")
        })
    }

    getItems() {
        return this.store.items
    }

    getDescription(item) {
        switch (item.type) {
            case ActivityType.register:
                return "Registered to the website"
            case ActivityType.login:
                return "Signed in"
            case ActivityType.logout:
                return "Signed out"
            case ActivityType.cart:
                return "Added item to cart"
            case ActivityType.wishlist:
                return "Added item to wishlist"
            case ActivityType.checkout:
                return "Paid for his cart"
            case ActivityType.removeFromCart:
                return "Removed item from cart"
            case ActivityType.removeFromWishlist:
                return "Removed item from wishlist"
        }
    }

    filterByEmail(email) {
        this.store.filterByEmail(email)
    }
}

const ActivityType = Object.freeze({
    "register": 0,
    "login": 1,
    "logout": 2,
    "cart": 3,
    "wishlist": 4,
    "checkout": 5,
    "removeFromCart": 6,
    "removeFromWishlist": 7
})

export default AdminViewModel