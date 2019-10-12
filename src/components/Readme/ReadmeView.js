import React from 'react'
import {observer} from 'mobx-react'
import '../../css/style.css';

class ReadmeView extends React.Component {
    render() {
        const {viewModel} = this.props;
        return (
            <div className={'moveLeft'}>
                <h1>Gamify README </h1>
                <h3>Store Name? </h3>
                <p>The store's name is "Gamify".</p>
                <h3>What are you selling? </h3>
                <p>We are selling video games of all sort of genres.</p>
                <h3>What additional page(s) did you add? How to operate them?</h3>
                <p>We added:<br/>
                    <ol>
                        <li>Category pages (6 categories) that filter all games sold in the store by their category.
                            <br/> To operate simply press on your desired category on the navigation bar, the the <br/>
                            corresponding category page will be displayed. Now find all games sold in our store of
                            that <br/>
                            category, and when pressing on your chosen game you are redirected to this game's view page
                            where you <br/>
                            can see more information regarding to it, add it to your wishlist or to your cart.
                        </li>
                        <br/>
                        <li> Settings page for changing the user's password.
                            <br/> To operate simply go to the right-most link on the navigation-bar where your email is
                            shown and
                            <br/> press the settings option. Now you are redirected to the change-password page where
                            you need to <br/>
                            type your new desired password and click on the "Change" button to apply changes.
                        </li>
                        <br/>
                        <li> View page which displays a specific game: (our store screen is the <br/>
                            main product screen where you view all products on sale).
                            <br/> To operate simply click on a game you are intereseted in and you will be
                            redirected, <br/>
                            to its view page where you can add it to cart / wishlist.
                        </li>
                        <br/>
                        <li> Wishlist page which displays all games you want to keep track of.
                            <br/>To operate simply go to the right-most link on the navigation-bar where your email is
                            shown and
                            <br/>press the wishlist option. Now you are redirected to the wishlist page where you see
                            all the<br/>
                            games you have added to your wishlist.
                        </li>
                        <br/>
                        <li> About page that elaborates about this project.
                            <br/>To operate simply go to the right-most link on the navigation-bar where your email is
                            shown and
                            <br/> press the about option. Now you are redirected to the about page where you read about
                            us.<br/>
                        </li>
                        <br/>
                        <li> 404 page that occurs when reaching a non-existing page.
                            <br/> No operation for this page.
                        </li>
                    </ol>
                    P.s. The admin page is a user page with the additional feature of watching the users' activities by
                    going to the right-most<br/>
                    link on the navigation-bar where the admin name appears and pressing the activities option.
                </p>
                <h3>What was hard to do?</h3>
                <p>
                    Well, basically every topic and subject I had used in this project was challenging to me since I
                    never had any
                    experience
                    with it. From basic Javascript and CSS to many npm libraries, react-components, principles in
                    FireBase, learning
                    MVVM architecture, <br/>
                    and understanding how to connect backend express-server between all these units.</p>
                <h3>Who is your partner? name and id. What did you do? What did your partner do? </h3>
                <p>My partner is Ido Wolf ID: 311241954.<br/>
                    I was in charge of the product design, functionality of the front-end and managing the
                    database.<br/>
                    Ido was in charge of the backend, operating the database and connecting the front-end to the server
                </p>
                <h3>Specify all the different route your app supports </h3>
                <p>
                    <ol>
                        <li>post /api/sign_in</li>
                        <li>post /api/token</li>
                        <li>post /api/sign_out</li>
                        <li>post /api/create_user</li>
                        <li>get /api/verify_cookie</li>
                        <li>get /api/user/:id</li>
                        <li>get /api/game/:id</li>
                        <li>get /api/get_games</li>
                        <li>get /api/get_category/:categoryId</li>
                        <li>get /api/search/:encodedText</li>
                        <li>get /api/get_cart/:uid</li>
                        <li>post /api/buy_products</li>
                        <li>put /api/add_to_cart/:userId/:itemId</li>
                        <li>put /api/decrement_from_cart/:userId/:itemId</li>
                        <li>delete /api/remove_from_cart/:userId/:itemId</li>
                        <li>get /api/get_wishlist/:uid</li>
                        <li>put /api/add_to_wishlist/:userId/:itemId</li>
                        <li>post /api/remove_from_wishlist/:userId</li>
                        <li>get /api/get_activities</li>
                        <li>get /api/get_activities/:is_admin</li>
                        <li>get /readme.html</li>

                    </ol>
                </p>
                <h3>How did you make your store secured?</h3>
                <p>
                    <ol>
                        <li>First, we used authentication service provided by Firebase that uses identification token in
                            order to<br/>
                            verify client requests.
                        </li>
                        <li>Second, we used Cross-Origin resource sharing mechanism in order to allow the website's
                            addresses.
                        </li>
                        <li>Third, we used Firebase's SDK service in order to create a session cookie when a user signs
                            into the app to verify it before every request.
                        </li>
                        <li>Lastly, to protect from forgery attacks, we create a CSRF token and verify it against the
                            user's token when they try to sign in.
                        </li>
                    </ol>
                </p>
                <h3>Did you implement the store using react.js? </h3>
                <p>Yes, we used react.js.</p>
            </div>
        )
    }
}

export default ReadmeView;