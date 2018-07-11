<template>
  <div id="app">
    <h1 class="title mainTitleColor webpageTitle">{{ msg }}</h1>
    <login-component></login-component>
    <router-view></router-view> <!-- Without a router view, there is no where for the components to go, as App.vue is always present. router-view is whichever route we click on, we view that route, and we want to view that route in App.vue.-->
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
import db from "./utils/firebaseConfig.js";
import loginComponent from "./components/Login.vue";
import footerComponent from "./components/Footer.vue";
export default {
  name: 'app',
  components:{loginComponent,footerComponent},
  data () {
    return {
      msg: 'Grocery App'
    }
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
