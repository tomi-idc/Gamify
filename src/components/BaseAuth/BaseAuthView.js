import React from 'react'
import {observer} from 'mobx-react'
import '../../css/style.css';
import {SubmitButton, LinkButton, Input, Message, Logo, Favicon, CheckButton} from '../Accessories.js';
import BaseView from '../BaseView';


@observer
class BaseAuthView extends BaseView {

    constructor(props) {
        super(props);
        this.currentScreenTitle = "";
        this.otherScreenTitle = "";
        this.showNavBar = false;
    }

    state = {
        email: '',
        password: ''
    };

    setEmail = (e) => {
        this.setState({ email: e.target.value })
    };

    setPassword = (e) => {
        this.setState({ password: e.target.value })
    };

    performAuth = () => {
        this.props.viewModel.performAuth({
            email: this.state.email,
            password: this.state.password
        })
    };

    openOtherAuthScreen = () => {
        this.props.viewModel.openOtherAuthScreen()
    };

    getContent() {
        const {viewModel} = this.props;
        return (
                <div id={'form'}>
                    <br/>
                    <span id={'logo'}><Logo /></span>
                    <div id={'formInput'}>
                        <br/>
                        <Message message={viewModel.getErrorMessage()} /> <br /><br/>
                        <Input value={this.state.email} type={'text'} placeholder={'Email'} onChange={this.setEmail} /> <br/> <br/>
                        <Input value={this.state.password} type={'password'} placeholder='Password' onChange={this.setPassword}/><br/>
                        <CheckButton title={'Remember Me'} onClick={() => viewModel.toggleRememberMe()} /><br/>
                    </div>
                    <div id={'formButtons'}>
                        <br/>
                        <SubmitButton title={this.currentScreenTitle} onClick={this.performAuth} /> <br/><br/>
                        <LinkButton title={this.otherScreenTitle} onClick={this.openOtherAuthScreen} /> |
                        <LinkButton title={'README'} onClick={() => viewModel.openReadmeScreen()} />

                    </div>
                </div>
        )
    }
}

export default BaseAuthView;