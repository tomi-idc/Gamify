import React from 'react'
import { inject } from 'mobx-react'
import RootStore from '../../models/RootStore'
import SearchViewModel from './SearchViewModel';
import BaseCategoryView from '../BaseCategory/BaseCategoryView';

@inject(RootStore.type.SEARCH_MODEL)
class SearchProvider extends React.Component {
    constructor(props) {
        super(props);
        const model = props[RootStore.type.SEARCH_MODEL];
        this.viewModel = new SearchViewModel(model, props.match.params.searchTerm, props.history)
    }

    render() {
        return (
            <BaseCategoryView viewModel={this.viewModel} />
        )
    }

    componentWillReceiveProps(newProps) {
        this.viewModel.loadCategory(newProps.match.params.searchTerm)
    }
}

export default SearchProvider