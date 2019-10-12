import React from 'react'
import { inject } from 'mobx-react'
import SlideshowView from './SlideshowView'
import SlideshowViewModel from './SlideshowViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.SLIDESHOW_MODEL, RootStore.type.CURRENTPRODUCT_MODEL)
class SlideshowProvider extends React.Component {
    constructor(props) {
        super(props);
        const slideshowModel = props[RootStore.type.SLIDESHOW_MODEL];
        const currProductModel = props[RootStore.type.CURRENTPRODUCT_MODEL];
        this.viewModel = new SlideshowViewModel(slideshowModel, currProductModel, props.history)
    }

    render() {
        return (
            <SlideshowView viewModel={this.viewModel}/>
        )
    }
}

export default SlideshowProvider