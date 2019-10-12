import React from 'react'
import '../css/style.css';
import { Bar } from './Accessories'
import NavigationBar from './Accessories'
import NavBarProvider from './NavBar/NavBarProvider';
import KeyboardEventHandler from "react-keyboard-event-handler";

class BaseView extends React.Component {

    constructor(props) {
        super(props);
        this.showNavBar = true;
    }

    render() {
        return (
            <div>
                <KeyboardEventHandler
                    handleKeys={['enter']}
                    onKeyEvent={(key, e) => {
                        }} />
                <NavBarProvider history={this.props.viewModel.history} showNavBar={this.showNavBar} />
                {this.getContent()}
            </div>
        )
    }

    getContent() {
        return (
            <div />
        )
    }
}

export default BaseView;