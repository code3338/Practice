<template>
  <div id="app">
    <h2 class="title">{{title}}</h2>
    <div>
      Name:<br />
      <input v-model="groceryList.groceryName"><br /><br />
      Description:<br />
      <textarea v-model="groceryList.groceryDescription" class="textArea"></textarea><br /><br />
      <button v-on:click="updateGroceryList(groceryList)" class="button is-primary is-outlined buttonBold flex2"><span>Update grocery list</span>
        <span class="icon is-small">
          <i class="far fa-edit"></i>
        </span>
      </button>
    </div><br>
    <div>
      <h3 class="title">Grocery Items</h3>
      <button v-on:click="updateItemList()" class="button is-primary is-outlined buttonBold flex2"><span>Update item QTY</span>
        <span class="icon is-small">
          <i class="far fa-edit"></i>
        </span>
      </button><br><br>
      <table class="marginTable">
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>QTY</th>
          <th>Delete Item</th>
        </tr>
        <tr v-for="groceryItem in groceryItemList">
          <td>{{groceryItem.productName}}</td>
          <td>${{groceryItem.price}}</td>
          <td><input v-model="groceryItem.QTY" v-bind:id="groceryItem.QTY" class="qty" v-on:change="qtyColor(groceryItem)"></td>
          <td><button v-on:click="deleteItem(groceryItem)" class="button is-danger is-outlined buttonBold flex2"><span>Delete</span>
            <span class="icon is-small">
              <i class="fas fa-times"></i>
            </span>
          </button></td>
        </tr>
      </table>
      <div class="updateQTYBtn">
        <button v-on:click="updateItemList()" class="button is-primary is-outlined buttonBold flex2"><span>Update item QTY</span>
          <span class="icon is-small">
            <i class="far fa-edit"></i>
          </span>
        </button><br><br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let mySearch = document.getElementById("mySearch");
export default {
  name:'app',
  data () {
    return {
      title:"Update Grocery List",
      groceryList:[],
      groceryItemList:[]
    }
  },
  methods: {
    updateGroceryList(groceryList) {
      axios.patch('http://127.0.0.1:3000/updategrocerylist', {
        groceryId:groceryList.groceryId,
        name:groceryList.groceryName,
        description:groceryList.groceryDescription
      })
        .then((response) => {
          console.log(response);
          /*Response was sent back from the backend with res.send*/
          console.log(this.groceryList);
        })
        .catch((error) => {
          console.log(error);
        })
        this.groceryList.groceryName= "",
        this.groceryList.groceryDescription=""
    },
    deleteItem(groceryItem) {
      axios.delete('http://127.0.0.1:3000/deleteitemfromgrocerylist/' + groceryItem.id)
        .then(function (response) {
          console.log(response);
        })
      location.reload();
    },
    updateItemList() {
      for(let i = 0; this.groceryItemList.length; i++) {
        axios.patch('http://127.0.0.1:3000/updategrocerylistitems', {
          id:this.groceryItemList[i].id,
          qty:this.groceryItemList[i].QTY
        })
          .then((response) => {
            console.log(response);
            /*Response was sent back from the backend with res.send*/
            /*Note: do not return data here, as we do not want to update the front end with a for loop.*/
            console.log(this.groceryItemList);
          })
          .catch((error) => {
            console.log(error);
          })
          location.reload();
      }
    },
    qtyColor(groceryItem) {
      document.getElementById(groceryItem.QTY).style.backgroundColor = "#0099cc";
    }
   },
  created() {
    axios.get('http://127.0.0.1:3000/updategrocerylist/' + this.$route.params.id)
      .then((response) => {
        console.log(response);
        this.groceryList=response.data[0]
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://127.0.0.1:3000/grocerylistfinal/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.groceryItemList=response.data
        })
        .catch((error) => {
          console.log(error);
        })
   }
 }


</script>

<style>
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
  .updateQTYBtn {
    margin:auto;
    margin-top:15px;
    margin-bottom:200px;
  }
  .qty {
    width:45px;
    margin:auto;
   }
   .qty:hover {
     background-color:#0099cc;
   }
  .marginTable {
    margin:auto;
    text-align:center;
  }
   h3 {
     text-align:center;
   }
  .textArea {
    width:250px;
    height:100px;
   }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
</style>
