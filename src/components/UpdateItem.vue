<template>
  <div id="app">
    <h2 class="title">{{title}}</h2>
    <div>
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
</style>
