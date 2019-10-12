import React from 'react'
import ReadmeView from './ReadmeView';
import AboutViewModel from './ReadmeViewModel';

class ReadmeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.viewModel = new AboutViewModel(props.history)
    }

    render() {
        return (
            <ReadmeView viewModel={this.viewModel} />
        )
    }
}

export default ReadmeProvider