import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ViewProductProvider from './components/ViewProduct/ViewProductProvider'
import LoginProvider from './components/Login/LoginProvider'
import RegisterProvider from './components/Register/RegisterProvider'
import SlideshowProvider from './components/Slideshow/SlideshowProvider'
import SearchProvider from './components/Search/SearchProvider'
import CartProvider from './components/Cart/CartProvider'
import AboutProvider from './components/About/AboutProvider'
import RootStore from './models/RootStore'
import BaseCategoryProvider from './components/BaseCategory/BaseCategoryProvider';
import WishlistProvider from './components/Wishlist/WishlistProvider';
import ChangePasswordProvider from './components/ChangePassword/ChangePasswordProvider';
import CheckoutProvider from './components/Checkout/CheckoutProvider';
import AdminProvider from './components/Admin/AdminProvider';
import NotFoundProvider from './components/NotFound/NotFoundProvider';
import ReadmeProvider from './components/Readme/ReadmeProvider';

class App extends Component {

    constructor() {
        super()
        this.rootStore = new RootStore();
    }

    render() {
        return (
            <Provider {...this.rootStore.getStores()}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={SlideshowProvider} />
                        <Route path='/login' component={LoginProvider} />
                        <Route path='/password' component={ChangePasswordProvider} />
                        <Route path='/register' component={RegisterProvider} />
                        <Route path='/view/:productId' component={ViewProductProvider} />
                        <Route path='/wishlist' component={WishlistProvider} />
                        <Route path='/cart' component={CartProvider} />
                        <Route path='/checkout' component={CheckoutProvider} />
                        <Route path='/activities' component={AdminProvider} />
                        <Route
                            path='/action'
                            render={(props) => <BaseCategoryProvider {...props} categoryId={"OuIgC88Oop83yI5VJSXR"} />}
                        />
                        <Route
                            path='/adventure'
                            render={(props) => <BaseCategoryProvider {...props} categoryId={"LXVOVsEETPResUbqdxRc"} />}
                        />
                        <Route
                            path='/combat'
                            render={(props) => <BaseCategoryProvider {...props} categoryId={"ZN5WKSkJdk7NwepO7wUH"} />}
                        />
                        <Route
                            path='/sports'
                            render={(props) => <BaseCategoryProvider {...props} categoryId={"67aYleyLQivRZOdWhwQM"} />}
                        />
                        <Route
                            path='/strategy'
                            render={(props) => <BaseCategoryProvider {...props} categoryId={"nFpjE2g6CbXN67emqdbm"} />}
                        />
                        <Route
                            path='/other'
                            render={(props) => <BaseCategoryProvider {...props} categoryId={"Wd5MXgbMRfexaaIFkpnt"} />}
                        />
                        <Route
                            path='/search/:searchTerm'
                            component={SearchProvider}
                        />
                        <Route path='/about' component={AboutProvider} />
                        <Route path='/readme' component={ReadmeProvider} />



                        {/* THIS HAS TO BE LAST */}
                        <Route component={NotFoundProvider} />
                        {/* THIS HAS TO BE LAST */}
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
