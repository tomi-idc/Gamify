class BaseAuthViewModel {
    constructor(loginStore, history) {
        this.store = loginStore;
        this.history = history;
        this.rememberMe = false;
    }

    openOtherAuthScreen() {
        throw new Error('You have to implement the method!');
    }

    openReadmeScreen() {
        this.history.push('/readme')
    }

    toggleRememberMe() {
        this.rememberMe = !this.rememberMe;
    }

    getErrorMessage() {
        if(this.store.getErrorMessage() === "*The password is invalid or the user does not have a password."){
            return "*The password is invalid."
        }
        return this.store.getErrorMessage()
    }

    performAuth(loginDetails) {
        throw new Error('You have to implement the method!');
    }
}

export default BaseAuthViewModel