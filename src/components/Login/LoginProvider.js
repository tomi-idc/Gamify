import React from 'react'
import { inject } from 'mobx-react'
import LoginView from './LoginView'
import LoginViewModel from './LoginViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.LOGIN_MODEL)
class LoginProvider extends React.Component {
    constructor(props) {
        super(props);
        const loginModel = props[RootStore.type.LOGIN_MODEL];
        this.viewModel = new LoginViewModel(loginModel, props.history)
    }

    render() {
        return (
            <LoginView viewModel={this.viewModel}/>
        )
    }
}

export default LoginProvider