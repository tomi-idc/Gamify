import BaseAuthViewModel from '../BaseAuth/BaseAuthViewModel'

class RegisterViewModel extends BaseAuthViewModel{
    constructor(loginStore, history) {
        super(loginStore, history)
    }

    openOtherAuthScreen() {
        this.history.push("/login")
    }

    performAuth(loginDetails) {
        let that = this
        this.store.performRegister(loginDetails, this.rememberMe, function() {
            that.history.push("/")
        })
    }
}

export default RegisterViewModel