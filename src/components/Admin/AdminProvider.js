import React from 'react'
import { inject } from 'mobx-react'
import RootStore from '../../models/RootStore'
import AdminView from './AdminView';
import AdminViewModel from './AdminViewModel';

@inject(RootStore.type.ADMIN_MODEL)
class AdminProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.ADMIN_MODEL];
        this.viewModel = new AdminViewModel(model, props.history)
    }

    render() {
        return (
            <AdminView viewModel={this.viewModel} />
        )
    }
}

export default AdminProvider