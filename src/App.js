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
import {/*addCollectionAndDocuments,*/ auth, createUserProfileDocument} from './firebase/firebase.utils.js';

import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from './redux/user/user.selectors';
// import {selectCollectionsForPreview} from './redux/shop/shop.selector';

class App extends Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser/*, collectionsArray*/} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            //? Check if the user Sign In
            if (userAuth) {
                //? Get User ref IF there is a doc ref we get it ELSE we create it
                const userRef = await createUserProfileDocument(userAuth);

                //? We are listening to the user ref if there is any change of the data
                //? and we will also get back the first state of the data
                userRef.onSnapshot(snapShot => {
                    //? so then using that we are going to set the state of our local object
                    //? with the snapshop id and data
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            }
            //? if the user logs out , we set the currentUser to null
            setCurrentUser(userAuth);

            //? We import the collection of items to the Database
            // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));

        })
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
                    <Route exact path="/signin"
                           render={() => this.props.currentUser ? (
                               <Redirect to='/'/>
                           ) : (
                               <SignInAndSignOutPage/>
                           )}/>

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
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
