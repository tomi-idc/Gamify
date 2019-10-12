import React from 'react'
import { inject } from 'mobx-react'
import NavBarView from './NavBarView'
import NavBarViewModel from './NavBarViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.USER_MODEL)
class NavBarProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.USER_MODEL];
        this.viewModel = new NavBarViewModel(model, props.showNavBar, props.history)
    }

    render() {
        return (
            <NavBarView viewModel={this.viewModel} showNavBar={this.props.showNavBar} />
        )
    }
}

export default NavBarProvider