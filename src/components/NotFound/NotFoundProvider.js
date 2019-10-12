import React from 'react'
import NotFoundViewModel from './NotFoundViewModel';
import NotFoundView from './NotFoundView';

class NotFoundProvider extends React.Component {
    constructor(props) {
        super(props);
        this.viewModel = new NotFoundViewModel(props.history)
    }

    render() {
        return (
            <NotFoundView viewModel={this.viewModel} />
        )
    }
}

export default NotFoundProvider