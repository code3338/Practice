<template>
  <div id="app">
    <nav-component></nav-component><br><br>
    <h2 class="title">{{title}}</h2>
    <div>
      Name:<br />
      <input v-model="groceryList.name" class="itemName"><br /><br />
      Description:<br />
      <textarea v-model="groceryList.description" class="groceryListDescription"></textarea><br /><br />
      <button v-on:click="addGroceryList(groceryList)" class="flex1 button is-success is-outlined buttonBold"><span>Create</span>
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import db from"../utils/firebaseConfig.js";
import navComponent from "./Nav.vue";
export default {
  name:"loggedin",
  components:{navComponent},
  data () {
    return {
      title:"Create Grocery List",
      listofGroceryLists:[],
      groceryList: {
        name: "",
        description: ""
      },
      userName:"testing name",
      userId:"testing id",
      email:"testing email"
    }
  },
  methods: {
    addGroceryList(groceryList) {
      axios.post('http://127.0.0.1:3000/creategrocerylist', {
        name:groceryList.name,
        description:groceryList.description
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.listofGroceryLists.unshift({
        name:this.groceryList.name,
        description:this.groceryList.description
      })
      this.groceryList.name = "",
      this.groceryList.description=""
    }
  },
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
  .itemName {
    width:200px;
  }
  .groceryCartImg {
    display:none;
   }
  .groceryListDescription {
    width:200px;
    height:100px;
    resize:none;
   }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
</style>
