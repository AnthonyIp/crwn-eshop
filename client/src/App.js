import React, {lazy, Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';
import './global.styles.scss';

// import './App.css';
// import {addCollectionAndDocuments } from './firebase/firebase.utils.js';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const ContactPage = lazy(() => import('./pages/contact/contact.component'));


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
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/shop" component={ShopPage}/>
                        <Route path="/contact" component={ContactPage}/>
                        <Route exact path="/checkout" component={CheckoutPage}/>
                        <Route exact path="/signin" render={() =>
                            currentUser ? (
                                <Redirect to='/'/>
                            ) : (
                                <SignInAndSignUpPage/>
                            )}/>
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
    //? We import the collections of items to the database
    // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
