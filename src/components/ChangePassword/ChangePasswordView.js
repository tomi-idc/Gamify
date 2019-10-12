import React from 'react'
import {observer} from 'mobx-react'
import '../../css/style.css';
import {SubmitButton, LinkButton, Input, Message, Logo, Favicon, CheckButton} from '../Accessories.js';
import BaseView from '../BaseView';


@observer
class ChangePasswordView extends BaseView {

    constructor(props) {
        super(props);
    }

    state = {
        password: '',
        secondPassword: ''
    };

    change() {
        this.props.viewModel.changePassword(this.state.password, this.state.secondPassword)
        alert('Password changed successfully!')
    }

    getContent() {
        const {viewModel} = this.props;
        return (
                <div id={'form'}>
                    <br/>
                    <p className={'settings'}>Settings:</p>
                    <p className={'listTitle'}>Change Password </p>
                    <div id={'formInput'}>
                        <Message message={viewModel.getErrorMessage()} /> <br /><br/>
                        <Input value={this.state.password} type={'password'} placeholder='Enter New Password' onChange={(e) => this.setState({ password: e.target.value })}/><br/><br/>
                        <Input value={this.state.secondPassword} type={'password'} placeholder='Repeat New Password' onChange={(e) => this.setState({ secondPassword: e.target.value })}/><br/>
                    </div>
                    <div id={'formButtons'}>
                        <br/><br/>
                        <SubmitButton title={'Change'} onClick={() => this.change()} /> <br/><br/>
                    </div>
                </div>
        )
    }
}

export default ChangePasswordView;