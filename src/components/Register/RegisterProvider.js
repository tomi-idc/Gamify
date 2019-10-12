import React from 'react'
import { inject } from 'mobx-react'
import RegisterView from './RegisterView'
import RegisterViewModel from './RegisterViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.LOGIN_MODEL)
class RegisterProvider extends React.Component {
    constructor(props) {
        super(props);
        const loginModel = props[RootStore.type.LOGIN_MODEL];
        this.viewModel = new RegisterViewModel(loginModel, props.history)
    }

    render() {
        return (
            <RegisterView viewModel={this.viewModel}/>
        )
    }
}

export default RegisterProvider