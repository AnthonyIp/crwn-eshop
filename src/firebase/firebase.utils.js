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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

