import React from 'react'
import { inject } from 'mobx-react'
import RootStore from '../../models/RootStore'
import WishlistViewModel from './WishlistViewModel';
import WishlistView from './WishlistView';

@inject(RootStore.type.WISHLIST_MODEL)
class WishlistProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.WISHLIST_MODEL];
        this.viewModel = new WishlistViewModel(model, props.history)
    }

    render() {
        return (
            <WishlistView viewModel={this.viewModel} />
        )
    }
}

export default WishlistProvider