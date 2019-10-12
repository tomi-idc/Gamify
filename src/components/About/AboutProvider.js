import React from 'react'
import { inject } from 'mobx-react'
import RootStore from '../../models/RootStore'
import AboutView from './AboutView';
import AboutViewModel from './AboutViewModel';

@inject(RootStore.type.LOGIN_MODEL)
class AboutProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.LOGIN_MODEL];
        this.viewModel = new AboutViewModel(model, props.history)
    }

    render() {
        return (
            <AboutView viewModel={this.viewModel} />
        )
    }
}

export default AboutProvider