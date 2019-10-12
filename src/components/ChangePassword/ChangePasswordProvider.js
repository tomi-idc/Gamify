import React from 'react'
import { inject } from 'mobx-react'
import RootStore from '../../models/RootStore'
import ChangePasswordView from './ChangePasswordView';
import ChangePasswordViewModel from './ChangePasswordViewModel';

@inject(RootStore.type.LOGIN_MODEL)
class ChangePasswordProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.LOGIN_MODEL];
        this.viewModel = new ChangePasswordViewModel(model, props.history)
    }

    render() {
        return (
            <ChangePasswordView viewModel={this.viewModel} />
        )
    }
}

export default ChangePasswordProvider