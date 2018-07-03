<template>
  <div id="app">
    <div>
     {{title}}
    </div>
   <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import firebaseui from "firebaseui";
import config from "../utils/firebaseConfig.js";
import "firebaseui/dist/firebaseui.css";/*import css file can be found in the firebaseui module. All we need to do is impor tthe stylesheet here.*/
export default {
  data () {
    return {
      title:"Grocery App Login",
    }
  },
  /*Vue event hooks wait until template gets mounted up with mounted with event hook into the DOM*/
  mounted() {
    let uiConfig = {
     signInSuccessUrl: '/loggedin', /*These are pages you can not allow people to have access to unless they are logged in.*/
     signInOptions: [
       // Leave the lines as is for the providers you want to offer your users.
       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
       firebase.auth.EmailAuthProvider.PROVIDER_ID,
     ],
     // Terms of service url.
     tosUrl: '<your-tos-url>' /*tos means terms of service*/
   };
   // Initialize the FirebaseUI Widget(A widget is a reusable piece of software.) using Firebase.
   let ui = new firebaseui.auth.AuthUI(firebase.auth());

   ui.start('#firebaseui-auth-container', uiConfig);
   /*ui.start find element in DoM and mounts up authUI interface.*/
  }
}


</script>
<style>

</style>
