import BaseAuthView from '../BaseAuth/BaseAuthView'
import '../../css/style.css';

class LoginView extends BaseAuthView {
    constructor(props) {
        super(props);
        this.currentScreenTitle = "Log In";
        this.otherScreenTitle = "Register";
    }
}

export default LoginView