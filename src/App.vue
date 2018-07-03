<template>
  <div id="app">
    <a href="/" v-on:click="signOut">Sign Out</a><br><br>
    <h1 class="title mainTitleColor webpageTitle">{{ msg }}</h1>
    <nav id="topNav">
      <button class="navBtn"><a href="/" class="link navBtnText">home</a></button>
      <button class="navBtn"><router-link to="/masterlist" class="link navBtnText">Master List</router-link></button>
      <button class="navBtn"><router-link to ="/additem" class="link navBtnText">Add Items</router-link></button>
      <button class="navBtn"><router-link to ="/creategrocerylist" class="link navBtnText">Create Grocery List</router-link></button>
      <button class="navBtn"><router-link to ="/listofgrocerylists" class="link navBtnText">List of Grocery Lists</router-link></button>
      <router-view></router-view>
    </nav>
    <div><br>
      <img class="groceryCartImg" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX1676725.jpg" width="400">
    </div><br><br>
    <footer id="copyright">@ Copyright {{copyrightFooter}}</footer>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import db from"./utils/firebaseConfig.js";
export default {
  name: 'app',
  data () {
    return {
      msg: 'Grocery App'
    }
  },
  computed: {
    /*Create a new object from the Date constructor function, and access the getFullYear() method from the new object*/
    copyrightFooter: function() {
      let d = new Date();
      return d.getFullYear();
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(function() {
       console.log('Signed Out');
       }, function(error) {
       console.error('Sign Out Error', error);
       });
    }
  },
  created() {
  /*We have to run the below in created as we have to wait for maybe firebase and/or firebaseui teacher believes loads, and then we run the below code. The code below brings data from firebase database over to DOM. On AuthStateChange is a built in event listener for firebase.*/
  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = firebase.auth().currentUser.displayName,
        this.userId = firebase.auth().currentUser.uid,
        this.email = firebase.auth().currentUser.email,
        this.$bindAsArray("users",db.ref("users/" + this.userId + "/movies"))
      }
  })
 }
}
</script>

<style>
.groceryCartImg {
  display:block;
  margin:auto;
  margin-top:100px;
}
.title {
  font-weight:bold;
  font-size:28px;
}
.mainTitleColor {
  background:-webkit-linear-gradient(green,blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color:transparent;
}
.navBtn {
  background-color:#009900;
  border-radius: 2px;
  box-shadow:2px 2px 9px gray;
}
.navBtn:hover {
  color:white;
  background-color:#00b33c;
  box-shadow:2px 2px 9px #4da6ff;
  cursor:pointer;
}
.navBtnText {
  color:white;
  font-weight:bold;
  font-size:18px;
}
.navBtnText:hover {
  color:white;
}
.link {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
