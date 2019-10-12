import React from 'react'
import { inject } from 'mobx-react'
import CheckoutView from './CheckoutView'
import CheckoutViewModel from './CheckoutViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.CART_MODEL, RootStore.type.USER_MODEL)
class CheckoutProvider extends React.Component {
    constructor(props) {
        super(props);
        const cartModel = props[RootStore.type.CART_MODEL]
        const userModel = props[RootStore.type.USER_MODEL]
        this.viewModel = new CheckoutViewModel(cartModel, userModel, props.history)
    }

    render() {
        return (
            <CheckoutView viewModel={this.viewModel} />
        )
    }
}

export default CheckoutProvider