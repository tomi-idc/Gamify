class ChangePasswordViewModel {
    constructor(loginStore, history) {
        this.store = loginStore;
        this.history = history;
        this.store.clearMessage()
        this.store.verifyCookie(function() {
            history.push("/login")
        })
    }

    changePassword(first, second) {
        let that = this
        this.store.changePassword(first, second, function() {
            that.history.push("/login")
        })
    }

    getErrorMessage() {
        return this.store.message
    }
}

export default ChangePasswordViewModel