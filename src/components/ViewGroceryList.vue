<template>
  <div id="app">
    <div>
      <h2 class="title">{{groceryListName.groceryName}}</h2>
      <p class="groceryDescription">({{groceryListName.groceryDescription}})</p>
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
        <p class="title emailTitleStyling">Send List to email:</p>
        <p>Email Address:  <input v-model="email" type="text"></p><br>
        <p><b>Add email content:</b></p>
        <textarea v-model="textarea" class="emailContent"></textarea><br><br>
        <button v-on:click="sendEmail(groceryItem)">send</button>
      </div><br><br><br><br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name:'app',
  props:["groceryItem"],
  data () {
    return {
      groceryListFinal:[],
      groceryList:[],
      groceryListName:[],
      send:[],
      email: "",
      textarea:""
    }
  },
  methods: {
    sendEmail(groceryItem) {
      axios.post('http://127.0.0.1:3000/viewgrocerylist', {
        email:this.email,
        text:this.textarea,
        groceryListName:this.groceryListName.groceryName,
        groceryListFinal:this.groceryListFinal,
        productName:this.groceryItem.productName,
        qty: this.groceryItem.qty,
        price:this.groceryItem.price

      })
      .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
    }
}

</script>

<style>
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
</style>
