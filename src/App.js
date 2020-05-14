import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component';
import SignInAndSignOutPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
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
                    })
                })
            } else {
                //? if the user logs out , we set the currentUser to null
                this.setState({currentUser: userAuth})
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div className="App">
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/shop" component={ShopPage}/>
                    <Route exact path="/signin" component={SignInAndSignOutPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
