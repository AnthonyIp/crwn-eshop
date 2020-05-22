import React, {Component} from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils.js';
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

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
            } else {
                //? if the user logs out , we set the currentUser to null
                setCurrentUser(userAuth);
            }
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
                           )} />

                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
