<template>
  <div id="app">
    <h2 class="title">{{title}}</h2>
    <br><br>
    <div>
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
export default {
  name:'app',
  data () {
    return {
      title:"Add a Movie",
      masterList:[],
      item: {
        name: "" ,
        price: 0,
        qty: 0,
      }
    }
  },
  methods: {
    addItem(item) {
      axios.post('http://127.0.0.1:3000/item', {
        name:item.name,
        price:item.price,
        qty:item.qty
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
  }
}

</script>

<style>
  .itemName {
    width:200px;
  }
 .price {
  width:100px;
  }
  .star {
   width:280px;
   margin:auto;
   text-align:center;
  }
</style>
