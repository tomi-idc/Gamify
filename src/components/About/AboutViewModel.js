class AboutViewModel {
    constructor(loginStore, history) {
        this.store = loginStore;
        this.history = history;
        this.store.clearMessage()
        this.store.verifyCookie(function() {
            history.push("/login")
        })
    }
}

export default AboutViewModel