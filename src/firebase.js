import firebase from 'firebase/app'
import "firebase/auth"
export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyALFpjuA57KxAMfsMbrCi_2ln2LzqIOejY",
    authDomain: "unichat-1af2c.firebaseapp.com",
    projectId: "unichat-1af2c",
    storageBucket: "unichat-1af2c.appspot.com",
    messagingSenderId: "1076663744159",
    appId: "1:1076663744159:web:4499403d5e1f4a0bfb14aa"
  }).auth();