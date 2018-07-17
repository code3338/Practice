<template>
  <div id="app">
    <nav-component></nav-component><br><br>
    <div>
      <h2 class="title5">{{groceryListName.groceryName}}</h2>
      <p class="groceryDescription title4">({{groceryListName.groceryDescription}})</p>
    </div><br>
    <div>
      <table class="marginTable">
        <tr>
          <th>Product Name</th>
          <th>QTY</th>
          <th>Price</th>
        </tr>
        <tr v-for="groceryItem in groceryListFinal" v-bind:grocery-item="groceryItem">
          <td>{{groceryItem.productName}}</td>
          <td class="qty">{{groceryItem.QTY}}</td>
          <td>${{groceryItem.price}}</td>
        </tr>
      </table><br>
      <div>
        <p class="totalTitle"><b>Total:</b></p><p>${{totalPrice}}</p>
      </div><br>
      <div>
        <p class="title3 emailTitleStyling">Send List to email:</p>
        <p><b>Email Address:</b></p>
        <input v-model="email" type="text" class="itemName"><br><br>
        <p><b>Add email content:</b></p>
        <textarea v-model="textarea" class="emailContent"></textarea><br><br>
        <button v-on:click="sendEmail()">send</button>
      </div><br><br><br><br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import db from"../utils/firebaseConfig.js";
import navComponent from "./Nav.vue";
import './src/bulma/css/bulma.css';
export default {
  name:"loggedin",
  components:{navComponent},
  props:["groceryItem"],
  data () {
    return {
      groceryListFinal:[],
      groceryList:[],
      groceryListName:[],
      send:[],
      email: "",
      textarea:"",
      userName:"testing name",
      userId:"testing id",
      email:""
    }
  },
  methods: {
    sendEmail() {
      axios.post('http://127.0.0.1:3000/viewgrocerylist', {
        email:this.email,
        text:this.textarea,
        groceryListName:this.groceryListName.groceryName,
        groceryListFinal:this.groceryListFinal,
        totalPrice:this.totalPrice
      })
      .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        window.alert("Email Sent");
        this.email=""
        this.textarea=""
     }
  },
  computed: {
    totalPrice: function() {
    let total = 0;
     for(let i = 0; i < this.groceryListFinal.length; i++) {
       let addNum=this.groceryListFinal[i].price * this.groceryListFinal[i].QTY
       total += addNum
     }
     return parseFloat(total.toFixed(2));
    }
  },
  created() {
      axios.get('http://127.0.0.1:3000/grocerylistfinal/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.groceryListFinal=response.data
        })
        .catch((error) => {
          console.log(error);
        })
        axios.get('http://127.0.0.1:3000/grocerylist/' + this.$route.params.id)
          .then((response) => {
            console.log(response);
            this.groceryList=response.data
          })
          .catch((error) => {
            console.log(error);
          })
          axios.get('http://127.0.0.1:3000/listofgrocerylists2/' + this.$route.params.id)
            .then((response) => {
              console.log(response);
              this.groceryListName=response.data[0]
            })
            .catch((error) => {
              console.log(error);
            })
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
  .title5 {
    font-weight:bold;
    font-size:28px;
    margin-top:35px;
    margin-bottom:2px;
  }
  .title3 {
    font-weight:bold;
    font-size:28px;
    margin-bottom:25px;
  }
  .title4 {
    margin-top:1px;
  }
  .groceryCartImg {
    display:none;
  }
  .itemName {
    width:200px;
  }
  .totalTitle {
    font-size:20px;
  }
  table,th,td {
    border: 2px solid #0099cc;
    border-collapse: collapse;
    padding:7px;
  }
  th {
   background-color:#99ccff;
   font-weight:bold;
   font-size:18px;
  }
  .emailContent {
    width:200px;
    height:100px;
    resize:none;
  }
  .emailTitleStyling {
    font-weight:bold;
    font-size:20px;
  }
  .groceryDescription {
    font-size:18px;
  }
  .marginTable {
    margin:auto;
    text-align:center;
  }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
  @media(max-width:385px) {
    .title5 {
      margin-top:75px;
    }
  }
  @media(max-width:295px) {
    .title5 {
      margin-top:100px;
    }
  }
</style>
