import React from "react";
import { observer } from 'mobx-react'
import '../../css/style.css';
import NavigationBar, { Bar } from '../Accessories';

@observer
class NavBarView extends React.Component {
    render() {
        const { viewModel } = this.props;

        let navBar = <div />
        let bar = <div />
        if (this.props.showNavBar === true && viewModel.getUser() !== null) {
            navBar = <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className={'row'}>
                    <NavigationBar email={viewModel.getUser().email} cartItemsCount={viewModel.getCartItemsCount()} showActivities={viewModel.getUser().is_admin} logOut={() => viewModel.logOut()} />
                </div>
            </nav>

            bar = <Bar />
        }
        return (
            <div>
                {navBar}
                {bar}
            </div>
        )
    }
}


export default NavBarView