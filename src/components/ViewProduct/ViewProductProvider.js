import React from 'react'
import { inject } from 'mobx-react'
import ViewProductView from './ViewProductView'
import ViewProductViewModel from './ViewProductViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.CURRENTPRODUCT_MODEL)
class ViewProductProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.CURRENTPRODUCT_MODEL];
        this.viewModel = new ViewProductViewModel(model, props.match.params.productId, props.history)
    }

    render() {
        return (
            <ViewProductView viewModel={this.viewModel} />
        )
    }
}

export default ViewProductProvider