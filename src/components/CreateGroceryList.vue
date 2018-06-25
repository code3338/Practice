<template>
  <div id="app">
    <h2 class="title">{{title}}</h2>
    <br><br>
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
export default {
  name:'app',
  data () {
    return {
      title:"Add Grocery List",
      listofGroceryLists:[],
      groceryList: {
        name: "",
        description: ""
      }
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
  }
}

</script>

<style>
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
