<template>
  <div id="app">
    <h2 class="title">{{title}}</h2>
    <div v-for="groceryList in listofGroceryLists" class="item">
      <p class="fontSize"><b>Name:</b> {{groceryList.groceryName}}</p>
      <p class="fontSize"><b>Description:</b> {{groceryList.groceryDescription}}</p><br>
      <button class="button is-primary is-outlined buttonBold flex2"><router-link :to="{path:'/updategrocerylist/' + groceryList.groceryId}" class="link buttonBold"><span>Update</span>
        <span class="icon is-small">
          <i class="far fa-edit"></i>
        </span>
      </router-link></button>
      <button v-on:click="deleteGroceryList(groceryList)" class="button is-danger is-outlined buttonBold flex2"><span>Delete</span>
        <span class="icon is-small">
          <i class="fas fa-times"></i>
        </span>
      </button>
      <button class="button is-info is-outlined buttonBold flex2"><router-link :to="{path:'/viewgrocerylist/' + groceryList.groceryId}" class="link buttonBold viewListFontColor"><span>View grocery list</span>
        <span class="icon is-small">
          <i class="fas fa-eye"></i>
        </span>
      </router-link></button>
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
      title:"List of Grocery Lists",
      listofGroceryLists:[]
    }
  },
  methods: {
    deleteGroceryList(groceryList) {
        axios.delete('http://127.0.0.1:3000/' + groceryList.groceryId)
          .then(function (response) {
            console.log(response);
          })
        location.reload();
    }
  },
  /*Upon creation of MasterList.vue component,  mySQL database sent to server, and then server sends the data to the front-end (AKA response data). We then insert this data into the masterList array in the data instance.*/
  created() {
    axios.get('http://127.0.0.1:3000/listofgrocerylists')
      .then((response) => {
        console.log(response);
        this.listofGroceryLists=response.data
      })
      .catch((error) => {
        console.log(error);
      })
    }
}

</script>

<style>
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
  .item {
    border:solid 2px #00ace6;
    width:50%;
    margin:auto;
    margin-bottom:15px;
  }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
</style>
