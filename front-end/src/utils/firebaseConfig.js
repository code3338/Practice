"use strict"
import firebase from "firebase";
let config = {
    
};
const firebaseApp = firebase.initializeApp(config);

let db = firebaseApp.database();

export default db
