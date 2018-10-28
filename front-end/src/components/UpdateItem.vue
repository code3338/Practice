<template>
  <div id="app">
    <nav-component></nav-component><br><br>
    <h2 class="title7">{{title}}</h2>
    <div class="updateItemMargin">
      Item Name:<br />
      <input v-model="item.productName" class="itemName"><br /><br />
      Price:<br />
      $<input v-model="item.price" class="price"><br /><br />
      <button v-on:click="updateItem(item)" class="button is-primary is-outlined buttonBold"><span>Update</span>
        <span class="icon is-small">
          <i class="far fa-edit"></i>
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
let mySearch = document.getElementById("mySearch");
export default {
  name:"loggedin",
  components:{navComponent},
  data () {
    return {
      title:"Update Item",
      item:[],
      userName:"testing name",
      userId:"testing id",
      email:"testing email"
    }
  },
  methods: {
    updateItem(item) {
      axios.patch('https://grocerylistorganizer.herokuapp.com/updateitem', {
        productId:item.productId,
        productName:item.productName,
        price:item.price,
      })
        .then((response) => {
          console.log(response);
          this.item=response.data
          /*Response was sent back from the backend with res.send*/
          console.log(this.item);
        })
        .catch((error) => {
          console.log(error);
        })
        this.item.productName= "",
        this.item.price=0
    }
  },
  created() {
    axios.get('https://grocerylistorganizer.herokuapp.com/updateitem/' + this.$route.params.id)
      .then((response) => {
        console.log(response);
        this.item=response.data[0]
      })
      .catch((error) => {
        console.log(error);
      })
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
  .updateItemMargin {
    margin-top:12px;
  }
 .title7 {
   margin-top:35px;
   font-weight:bold;
   font-size:28px;
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
  @media(max-width:380px) {
    .updateItemMargin {
      margin-top:12px;
    }
   .title7 {
     margin-top:85px;
     font-weight:bold;
     font-size:28px;
    }
  }
</style>
