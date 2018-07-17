<template>
<div id="app">
  <nav-component></nav-component><br><br>
  <p class="userName">Hi {{this.userName}}! Welcome to your Grocery App!</p>
  <div><br>
    <img class="groceryCartImg" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX1676725.jpg" width="400">
  </div><br><br>
  <p class="gettingStartedTitle">Getting started:</p>
  <div class="gettingStarted">
    <p><b>1.</b> To get started simply create a grocery list by clicking on the <b>Create GroceryList button</b> above.</p>
    <p><b>2.</b> Next, add grocery items to your Master List by clicking on the <b>Add items button</b> above.</p>
    <p><b>3.</b> Thirdly, to add grocery items to your list click on the <b>Master List button</b> above, find item you would like to add to your list by either searching for the item in the search box, or scrolling to find it, input quantity(qty), select grocery list you would like to add the item to, and then click the add button to add the item to the selected grocery list.</p>
    <p><b>4.</b> Lastly, to view your grocery list with the grocery items you added, click on the <b>List of Grocery Lists button</b> above, and then select the <b>View grocery list button</b>. In this view grocery list button, at the bottom of the page, you have the option to email yourself, a friend, or someone else the grocery list you created.</p>
    <p> Pretty Cool uh? At least I think so. Hope this App is useful and fun to use! Enjoy! :)</p>
  </div>
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
   created() {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         this.userName = firebase.auth().currentUser.displayName;
         this.userId = firebase.auth().currentUser.uid;
       }
       else {
         /*Kick the user back to the Login page if they do not exist. */
         window.location.href="/"
       }
     })
   }
}
</script>

<style>
#signOut {
  display:block;
}
 .groceryCartImg {
   display:block;
   margin:auto;
   margin-top:7px;
   width:300px;
   }
  .gettingStartedTitle {
    font-size:22px;
    font-weight:bold;
    margin:auto;
    width:90%;
  }
  .gettingStarted {
    width:700px;
    margin:auto;
    text-align:left;
  }
  .userName {
    font-size:22px;
    font-weight:bold;
    margin:auto;
    margin-top: 25px;
    width:90%;
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
  @media(max-width:768px) {
    .gettingStartedTitle {
      margin-top:7px;
    }
    .gettingStarted {
      width:500px;
    }
    .userName {
      margin-top: 45px;
      width:80%;
    }
  }
  @media(max-width:540px) {
    .gettingStartedTitle {
      margin-top:7px;
    }
    .gettingStarted {
      width:90%;
      margin-top:15px;
    }
    .userName {
      margin-top: 45px;
      width:80%;
    }
  }
  @media(max-width:340px) {
    .gettingStartedTitle {
      margin-top:15px;
    }
    .gettingStarted {
      width:90%;
      margin-top:15px;
    }
    .userName {
      margin-top:105px;
      width:80%;
    }
  }

</style>
