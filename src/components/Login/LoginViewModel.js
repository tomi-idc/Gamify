import BaseAuthViewModel from '../BaseAuth/BaseAuthViewModel'

class LoginViewModel extends BaseAuthViewModel{
    constructor(loginStore, history) {
        super(loginStore, history)
    }

    openOtherAuthScreen() {
        this.history.push("/register")
    }

    performAuth(loginDetails) {
        let that = this
        this.store.performLogin(loginDetails, this.rememberMe, function() {
            that.history.push("/")
        })
    }
}

export default LoginViewModel