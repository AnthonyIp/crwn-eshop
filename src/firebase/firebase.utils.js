import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDO-Y7lovSlMxbCR3Se7Nuk1dwzWHeSTwc",
    authDomain: "crwn-db-c8a5e.firebaseapp.com",
    databaseURL: "https://crwn-db-c8a5e.firebaseio.com",
    projectId: "crwn-db-c8a5e",
    storageBucket: "crwn-db-c8a5e.appspot.com",
    messagingSenderId: "156574540018",
    appId: "1:156574540018:web:67dd71546cabb99b3bf06b",
    measurementId: "G-VYY6Z0PTFP"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //? if the user sign in unsuccessfully , it returns
    if (!userAuth) return;

    //? We get the user ref from the user authenthication
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    //? We tried to get the snapshot of the user
    const snapShot = await userRef.get();

    //? if the user doesn't exist , we create it
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (e) {
            console.log('error creating user', e.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
