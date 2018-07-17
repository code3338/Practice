<template>
  <div id="app">
    <div class="navMsgSignOutDiv">
      <div class="navMsg">
        <h1 class="mainTitleColor webpageTitle">{{ msg }}</h1>
      </div>
      <div class="signOutMargin">
        <button class="button is-info"><a href="/login" v-on:click="signOut" class="buttonBold1" id="signOut">Sign Out</a><br></button>
      </div>
    </div>
    <router-view></router-view> <!-- Without a router view, there is no where for the components to go, as App.vue is always present. router-view is whichever route we click on, we view that route, and we want to view that route in App.vue.-->

    <footer-component></footer-component>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import db from "./utils/firebaseConfig.js";
import footerComponent from "./components/Footer.vue";
import './src/bulma/css/bulma.css';
export default {
  name: 'app',
  components:{footerComponent},
  data () {
    return {
      msg: 'Grocery App'
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
   }
}
</script>

<style>
#signOut {
  display:none;
  background-color:
}
.navMsg,.signOutMargin {
  background-color:#80d4ff;
}
.buttonBold1 {
  color:white;
  font-weight:bold;
  font-size:17px;
}
.buttonBold1:hover {
  color:#99ccff;
}
.navMsg {
  position:fixed;
  top:2px;
  left:1%;
  right:1%;
  z-index:1;
}
.signOutMargin {
  position:fixed;
  top:0;
  right:0;
  margin-top:7px;
  margin-right:45px;
  z-index:1;
}
.msgAlign {
  text-align:center;
  margin:auto;
}
.navFlex1 {
  flex:2;
}
.navFlex2 {
  flex:1;
}
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
  font-weight:bold;
  font-size:28px;
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
@media(max-width:768px) {
  .signOutMargin {
    margin-left:125px;
  }
  .msgAlign {
    margin-left:34%;
    width:300px;
    border:solid 2px blue;
  }
  .navFlexDisplay {
    border:solid 2px blue;
  }
}
@media(max-width:500px) {
  .navMsg {
    position:fixed;
    top:2px;
    left:0;
    margin-right:200px;
    border-right:solid 2px blue;
  }
  .signOutMargin {
    position:fixed;
    top:0;
    right:0;
    margin-top:7px;
    margin-right:45px;
  }
}
@media(max-width:390px) {
  .navMsg {
    margin-right:150px;
    border-right:solid 2px blue;
  }
  .signOutMargin {
    position:fixed;
    top:0;
    right:0;
    margin-top:7px;
    margin-right:30px;
  }
}
@media(max-width:340px) {
  .navMsg {
    margin-right:150px;
    border-right:solid 2px blue;
  }
  .signOutMargin {
    position:fixed;
    top:0;
    right:0;
    margin-top:7px;
    margin-right:30px;
  }
  .navMsgSignOutDiv {
    margin-bottom:55px;
  }
}
@media(max-width:295px) {
  .groceryCartImg {
  display:block;
  margin:auto;
  margin-top:100px;
  }
}
</style>
