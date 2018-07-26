<template>
  <div id="app">
    <nav-component></nav-component><br><br>
    <h2 class="title">{{title}}</h2>
    <div class="listofGroceryListsMargin">
      <div v-for="groceryList in listofGroceryLists" class="item2 groceryCardBackgroundColor">
        <p class="fontSize"><b>Name:</b> {{groceryList.groceryName}}</p>
        <p class="fontSize"><b>Description:</b> {{groceryList.groceryDescription}}</p><br>
        <button class="button is-primary is-outlined buttonBold flex2 updateButton2"><router-link :to="{path:'/updategrocerylist/' + groceryList.groceryId}" class="link buttonBold"><span>Update</span>
          <span class="icon is-small">
            <i class="far fa-edit"></i>
          </span>
        </router-link></button>
        <button v-on:click="deleteGroceryList(groceryList)" class="button is-danger is-outlined buttonBold flex2 deleteButton2"><span>Delete</span>
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </button>
        <button class="button is-info is-outlined buttonBold flex2 viewListButton"><router-link :to="{path:'/viewgrocerylist/' + groceryList.groceryId}" class="link buttonBold viewListFontColor"><span>View grocery list</span>
          <span class="icon is-small">
            <i class="fas fa-eye"></i>
          </span>
        </router-link></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import db from"../utils/firebaseConfig.js";
import navComponent from "./Nav.vue";
let mySearch = document.getElementById("mySearch");
export default {
  name:"loggedin",
  components:{navComponent},
  data () {
    return {
      title:"List of Grocery Lists",
      listofGroceryListsDraft:[],
      listofGroceryLists:[],
      userName:"testing name",
      userId:"testing id",
      email:"testing email"
    }
  },
  methods: {
    deleteGroceryList(groceryList) {
      if(confirm("Are you sure you want to delete this grocery list?")) {
        axios.delete('https://afternoon-hollows-32021.herokuapp.com/' + groceryList.groceryId)
          .then(function (response) {
            console.log(response);
            location.reload();
          })
      }
      else {
        console.log("Not deleted");
      }
    }
  },
  /*Upon creation of MasterList.vue component,  mySQL database sent to server, and then server sends the data to the front-end (AKA response data). We then insert this data into the masterList array in the data instance.*/
  created() {
    axios.get('https://afternoon-hollows-32021.herokuapp.com/listofgrocerylists/' + this.$route.params.id)
      .then((response) => {
        console.log(response);
        this.listofGroceryLists = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = firebase.auth().currentUser.displayName;
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
  .listofGroceryListsMargin {
    margin-top:80px;
  }
  .title {
    font-weight:bold;
    font-size:28px;
    position:fixed;
    top:135px;
    left:1%;
    right:1%;
  }
  .groceryCardBackgroundColor {
    background-color: #e6f2ff;
  }
  .groceryCartImg {
    display:none;
  }
  .viewListFontColor {
    color:#0099cc;
  }
  .fontSize {
    font-size:18px;
  }
  .buttonBold {
    font-weight:bold;
    font-size:17px;
  }
  .buttonBold:hover {
    color: white;
  }
  .item2 {
    border:solid 2px #00ace6;
    width:475px;
    margin:auto;
    margin-bottom:15px;
  }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
  @media(max-width:680px) {
    .listofGroceryListsMargin {
      margin-top:90px;
    }
    .title {
      top:145px;
    }
  }
  @media(max-width:480px) {
    .item2 {
      width:90%;
    }
    .viewListButton {
      margin-top:20px;
      margin-bottom:10px;
    }
    .updateButton2 {
      margin-right:20px;
    }
    .deleteButton2 {
      margin-left:20px;
    }
  }
  @media(max-width:377px) {
    .listofGroceryListsMargin {
      margin-top:135px;
    }
    .title {
      top:190px;
    }
  }
  @media(max-width:320px) {
    .item2 {
      width:90%;
    }
    .viewListButton {
      margin-top:20px;
      margin-bottom:10px;
    }
    .updateButton2 {
      margin-right:10px;
    }
    .deleteButton2 {
      margin-left:10px;
    }
  }
  @media(max-width:295px) {
    .listofGroceryListsMargin {
      margin-top:175px;
    }
    .title {
      top:205px;
    }
  }
</style>
