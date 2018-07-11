"use strict"
import firebase from "firebase";
let config = {
    apiKey: "AIzaSyCCDIHKEFzLRFVtV-xIl4wTLUgIZrTze-0",
    authDomain: "groceryappproject.firebaseapp.com",
    databaseURL: "https://groceryappproject.firebaseio.com",
    projectId: "groceryappproject",
    storageBucket: "groceryappproject.appspot.com",
    messagingSenderId: "39180647700"
};
const firebaseApp = firebase.initializeApp(config);

let db = firebaseApp.database();

export default db
