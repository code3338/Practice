<template>
<div id="app">
  <a href="/login" v-on:click="signOut">Sign Out</a><br><br>
  <h1 class="title mainTitleColor webpageTitle">{{ msg }}</h1>
  <nav-component></nav-component><br><br>
  <div><br>
    <img class="groceryCartImg" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX1676725.jpg" width="400">
  </div><br><br>
  <footer-component></footer-component>
</div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import db from"../utils/firebaseConfig.js";
import navComponent from "./Nav.vue";
import footerComponent from "./Footer.vue";
export default {
  name: 'loggedin',
  components:{navComponent,footerComponent},
  data () {
    return {
      msg: 'Grocery App',
      userName:"testing name",
      userId:"testing id",
      email:"testing email"
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
   // firebase: {
   //   users:db.ref("users")
   // },
   created() {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         this.userName = firebase.auth().currentUser.displayName,
         this.userId = firebase.auth().currentUser.uid,
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
margin-top:50px;
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
