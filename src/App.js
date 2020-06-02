import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from './components/header/header.component';
// import {addCollectionAndDocuments } from './firebase/firebase.utils.js';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from "./redux/user/user.actions";

class App extends Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        // const {collectionsArray} = this.props;
        // ? We import the collection of items to the Database
        // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
        const {checkUserSession} = this.props;
        checkUserSession();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path="/checkout" component={CheckoutPage}/>
                    <Route exact path="/signin" render={() =>
                        this.props.currentUser ? (
                            <Redirect to='/'/>
                        ) : (
                            <SignInAndSignOutPage/>
                        )} />

                </Switch>
            </div>
        );
    }
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
