import React from 'react'
import { inject } from 'mobx-react'
import CartView from './CartView'
import CartViewModel from './CartViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.CART_MODEL)
class CartProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.CART_MODEL];
        this.viewModel = new CartViewModel(model, props.history)
    }

    render() {
        return (
            <CartView viewModel={this.viewModel} />
        )
    }
}

export default CartProvider