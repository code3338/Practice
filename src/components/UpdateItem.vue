<template>
  <div id="app">
    <h2>{{title}}</h2>
    <div>
      Product Name:<br />
      <input v-model="item.productName"><br /><br />
      Price:<br />
      <input v-model="item.price"><br /><br />
      <button v-on:click="updateItem(item)">update</button>
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
      title:"Update Item",
      item:[]
    }
  },
  methods: {
    updateItem(item) {
      axios.patch('http://127.0.0.1:3000/updateitem', {
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
    axios.get('http://127.0.0.1:3000/updateitem/' + this.$route.params.id)
      .then((response) => {
        console.log(response);
        this.item=response.data[0]
      })
      .catch((error) => {
        console.log(error);
      })
    }
}

</script>

<style>
  .item {
    border:solid 2px blue;
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
