import React, {useEffect} from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from './components/header/header.component';
import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from "./redux/user/user.actions";
// import {addCollectionAndDocuments } from './firebase/firebase.utils.js';

const App = ({checkUserSession, currentUser/*, collectionsArray*/}) => {

    useEffect(() => {
        checkUserSession();
        // ? We import the collection of items to the Database
        // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
    }, [checkUserSession]);

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/shop" component={ShopPage}/>
                <Route exact path="/checkout" component={CheckoutPage}/>
                <Route exact path="/signin" render={() =>
                    currentUser ? (
                        <Redirect to='/'/>
                    ) : (
                        <SignInAndSignOutPage/>
                    )}/>

            </Switch>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
    //? We import the collections of items to the database
    // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(App);
