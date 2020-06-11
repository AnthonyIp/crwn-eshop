import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
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
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                });
            }
            //? if the user logs out , we set the currentUser to null
            this.setState({currentUser: userAuth});
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Header/>
                </CurrentUserContext.Provider>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.state.currentUser ? (
                                <Redirect to='/'/>
                            ) : (
                                <SignInAndSignUpPage/>
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
