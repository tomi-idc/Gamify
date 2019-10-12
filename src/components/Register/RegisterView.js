import BaseAuthView from '../BaseAuth/BaseAuthView'
import '../../css/style.css';

class RegisterView extends BaseAuthView {
    constructor(props) {
        super(props);
        this.currentScreenTitle = "Register";
        this.otherScreenTitle = "Log In";
    }
}

export default RegisterView