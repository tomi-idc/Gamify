import React from 'react'
import { inject } from 'mobx-react'
import BaseCategoryView from './BaseCategoryView'
import BaseCategoryViewModel from './BaseCategoryViewModel'
import RootStore from '../../models/RootStore'

@inject(RootStore.type.CATEGORY_MODEL)
class BaseCategoryProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.CATEGORY_MODEL];
        this.viewModel = new BaseCategoryViewModel(model, props.categoryId, props.history)
    }

    render() {
        return (
            <BaseCategoryView viewModel={this.viewModel} />
        )
    }
}

export default BaseCategoryProvider