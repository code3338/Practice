<template>
  <div id="app">
    <nav-component></nav-component><br><br>
    <h2 class="title">{{title}}</h2>
    <div class="searchMargin">
      <p><input type="text" v-model="mySearch" name="q" placeholder="search item name..." class="searchInput">
      <button v-on:click="searchByName(filteredList)" class="searchBtn">search</button></p>
    </div>
    <br>
    <!--masterList data brought to browser.-->
    <div class="cardMargin">
      <div v-for="item in filteredList" class="item">
        <div class="lineSpacing cardBackgroundColor">
           <p><b>Item Id:</b> {{item.productId}}</p>
           <p><b>Item Name:</b> {{item.productName}}<p>
           <div>
             <p><b>Price:</b> $ {{item.price}}</p>
           </div>
         </div>
        <div class="flex borderBottom cardBackgroundColor">
          <button class="button is-primary is-outlined buttonBold flex2 updateItemButton"><router-link :to="{path:'/updateitem/' + item.productId}" class="is-primary link buttonBold"><span>Update item</span>
            <span class="icon is-small">
              <i class="far fa-edit"></i>
            </span>
          </router-link></button><br><br>
          <button v-on:click="deleteItem(item)" class="button is-danger is-outlined buttonBold flex2"><span>Delete item</span>
            <span class="icon is-small">
              <i class="fas fa-times"></i>
            </span>
          </button><br><br>
        </div>
        <div>
          <p class="addItemGroceryTitle">Add Item to Grocery List:</p>
          <b>QTY:</b><input v-model="item.QTY" class="qty">
        </div><br>
        <div class="flex align">
          <label class="groceryLabel selectList">Select List:</label>
          <div class="select is-info marginAuto">
            <select v-bind:id="item.productId" class="flex1 grocerySelect">
              <option v-for="grocery in groceryList" v-bind:value="grocery.groceryId" v-bind:id="grocery.groceryName">{{grocery.groceryName}}</option>
            </select>
          </div>
          <button v-on:click="addItem(item)" class="flex2 button is-success is-outlined buttonBold addItemButton"><span>Add item</span>
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
          </button>
        </div>
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
export default {
  name:"loggedin",
  components:{navComponent},
  data () {
    return {
      title:"Master List",
      masterList:[],
      groceryList:[],
      filteredList:[],
      mySearch: "",
      userName:"testing name",
      userId:"testing id",
      email:"testing email"
    }
  },
  methods: {
    searchByName(filteredList) {
      let searchInput = this.mySearch.toUpperCase();
      function searchName(item) {
        if(item.productName.toUpperCase() == searchInput) {
            return true;
        }
        else if(searchInput == "") {
          return location.reload()
        }
      }
      this.filteredList = this.masterList.filter(searchName);
      if(this.filteredList.length == 0) {
        alert("Item name does not exist. Try again!")
        return location.reload();
      }
    },
    deleteItem(item) {
        if( confirm("If you delete this item, item will be removed from all grocery lists item was added to. Do you still want to delete this item?")) {
          axios.delete('http://127.0.0.1:3000/deleteitem/' + item.productId)
            .then(function (response) {
              console.log(response);
            })
          location.reload();
        }
        else {
          console.log("not deleted");
        }
    },
    addItem(item) {
      let value = document.getElementById(item.productId).value;
      let value2 = item.QTY;
      if(value2 === 0) {
        alert("QTY is 0. Please enter a QTY greater than 0.");
      }
      else {
        alert("Item has been added to Grocery List.");
        axios.post('http://127.0.0.1:3000/additemtogrocerylist', {
          productId:item.productId,
          groceryId:value,
          qty:value2
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }
  },
  /*Upon creation of MasterList.vue component,  mySQL database sent to server, and then server sends the data to the front-end (AKA response data). We then insert this data into the masterList array in the data instance.*/
  created() {
    axios.get('http://127.0.0.1:3000/masterlist/' + this.$route.params.id)
      .then((response) => {
        console.log(response);
        this.masterList=response.data
        this.filteredList=response.data
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('http://127.0.0.1:3000/getgrocerylistname/' + this.$route.params.id)
      .then((response) => {
        console.log(response);
        this.groceryList=response.data
      })
      .catch((error) => {
        console.log(error);
      })
        .catch((error) => {
          console.log(error);
        })
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userName = firebase.auth().currentUser.displayName,
          this.userId = firebase.auth().currentUser.uid
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
 .grocerySelect {
    width:190px;
  }
 .searchInput {
   width:220px;
 }
 .searchMargin {
   position:fixed;
   left:1%;
   right:1%;
   top:200px;
   z-index:1;
 }
 .cardMargin {
   margin-top:115px;
 }
 .groceryCartImg {
   display:none;
 }
 .marginAuto {
   margin:auto;
 }
 .title {
   position:fixed;
   left:1%;
   right:1%;
   top:115px;
   font-weight:bold;
   font-size:28px;
 }
 .addItemGroceryTitle {
    font-weight:bold;
    font-size:18px;
    margin-top:10px;
  }
 .groceryLabel {
   font-size:17px;
   font-weight:bold;
  }
  .selectList {
    margin:auto;
    text-align:center;
  }
  .lineSpacing {
    line-height:30px;
    font-size:17px;
  }
  .align {
    margin:auto;
    text-align:center;
  }
  .borderBottom {
    border-bottom:solid 2px #00ace6;
    border-bottom-width:5px;
  }
  .flex {
    display:flex;
    margin:auto;
    text-align:center;
  }
  .flex1 {
    flex:1;
    margin:auto;
    margin-left: 5px;
    margin-right: 5px;
    text-align:center;
  }
  .flex2 {
    margin:auto;
  }
  .qty {
    width:45px;
    margin-top:20px;
  }
  .buttonBold {
    font-weight:bold;
    font-size:17px;
  }
  .buttonBold:hover {
    color: white;
  }
  .item {
    border:solid 2px #00ace6;
    width:400px;
    margin:auto;
    margin-bottom:15px;
    display:inline-block;
    margin-left:12px;
  }
  .cardBackgroundColor {
    background-color: #e6f2ff;
  }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }

  @media(max-width:1600px) {
    .item {
      width:425px;
    }
  }
  @media(max-width:1200px) {
    .item {
      width:400px;
    }
  }
  @media(max-width:680px) {
    .title {
      top:150px;
    }
  }
  @media(max-width:480px) {
    .item {
      width:90%;
    }
  }
  @media(max-width:400px) {
    .item {
      width:80%;
    }
    .flex {
      display:block;
      margin:auto;
    }
    .flex2 {
      margin:auto;
    }
    .updateItemButton {
      margin-top:10px;
    }
    .addItemButton {
      margin-top:20px;
      margin-bottom:10px;
    }
    .searchBtn {
      margin-top:7px;
    }
    .searchInput {
      width:165px;
    }
  @media(max-width:375px) {
      .title {
        top:100px;
      }
      .searchMargin {
        top:235px;
      }
      .cardMargin {
        margin-top:150px;
      }
    }
    @media(max-width:295px) {
      .title {
        top:205px;
      }
      .searchMargin {
        top:245px;
      }
      .cardMargin {
        margin-top:155px;
      }
    }
  }
</style>
