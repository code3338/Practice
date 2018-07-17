<template>
  <div id="app">
    <nav-component></nav-component><br><br>
    <h2 class="title">{{title}}</h2>
    <div class="addItemMargin">
      Item name:<br />
      <input v-model="item.name" class="itemName"><br /><br />
      price:<br />
      $<input v-model="item.price" class="price"><br /><br />
      <button v-on:click="addItem(item)" class="flex1 button is-success is-outlined buttonBold"><span>Add item</span>
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
      title:"Add Item",
      masterList:[],
      item: {
        name: "" ,
        price: 0,
        qty: 0,
        userName:"testing name",
        userId:"testing id",
        email:"testing email"
      }
    }
  },
  methods: {
    addItem(item) {
      axios.post('http://127.0.0.1:3000/item', {
        name:item.name,
        price:item.price,
        qty:item.qty,
        userId:this.userId
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.masterList.unshift({
        name:this.item.name,
        price:this.item.price,
      })
      this.item.name = "",
      this.item.price = 0
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userName = firebase.auth().currentUser.displayName,
        this.userId = firebase.auth().currentUser.uid,
        this.$bindAsArray("users",db.ref("users/" + this.userId + "/movies"))
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
.addItemMargin {
  margin-top:70px;
}
.title {
  font-weight:bold;
  font-size:28px;
  position:fixed;
  top:135px;
  left:1%;
  right:1%;
}
 .groceryCartImg {
   display:none;
  }
  .itemName {
    width:200px;
  }
 .price {
    width:90px;
  }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
  @media(max-width:680px) {
    .addItemMargin {
      margin-top:80px;
    }
    .title {
      top:145px;
    }
  }
  @media(max-width:377px) {
    .addItemMargin {
      margin-top:125px;
    }
    .title {
      top:190px;
    }
  }
  @media(max-width:295px) {
    .addItemMargin {
      margin-top:135px;
    }
    .title {
      top:205px;
    }
  }
</style>
