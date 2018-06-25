<template>
  <div id="app">
    <h2 class="title">{{title}}</h2>
    <input type="text" v-model="mySearch" name="q" placeholder="search item name...">
    <button v-on:click="searchByName(filteredList)">search</button>
    <br><br>
    <!--masterList data brought to browser.-->
    <div v-for="item in filteredList" class="item">
      <div class="lineSpacing">
         <p><b>Item Id:</b> {{item.productId}}</p>
         <p><b>Item Name:</b> {{item.productName}}<p>
         <div>
           <p><b>Price:</b> $ {{item.price}}</p>
         </div>
       </div>
      <div class="flex">
        <button class="button is-primary is-outlined buttonBold flex2"><router-link :to="{path:'/updateitem/' + item.productId}" class="link buttonBold"><span>Update item</span>
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
        <label class="flex1 groceryLabel">Select List:</label>
        <div class="select is-info marginAuto">
          <select v-bind:id="item.productId" class="flex1">
            <option v-for="grocery in groceryList" v-bind:value="grocery.groceryId">{{grocery.groceryName}}</option>
          </select>
        </div>
        <button v-on:click="addItem(item)" class="flex1 button is-success is-outlined buttonBold"><span>Add item</span>
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name:'app',
  data () {
    return {
      title:"Master List",
      masterList:[],
      groceryList:[],
      groceryListFinal:[],
      filteredList:[],
      mySearch: ""
    }
  },
  methods: {
    searchByName() {
      // function everyItem() {
      //   return this.masterList.productName
      // }
      let searchInput= this.mySearch.toUpperCase();
      function searchName(item) {
        if(item.productName.toUpperCase() == searchInput) {
            return true;
        }
        else if(item.productName.toUpperCase() != searchInput && item.productName.toUpperCase() == searchInput) {
          return location.reload()
        }
        /*................*/
        // else if (searchInput != this.masterList.every(everyItem)) {
        //   return location.reload()ketchup
        // }
        else if(searchInput == "") {
          return location.reload()
        }
      }
        /*filter method looks through item(or object) in an array, and return those that return true from the function searchName.*/
        this.filteredList = this.masterList.filter(searchName);
        // searchInput.addEventListener("focus", function() {
        //   searchByName();
        // })
 },
    deleteItem(item) {
        if( confirm("If you delete item, item will be removed from all grocery lists item was added to. Do you still wish to delete this item? ")) {
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
      });
    }
  },
  /*Upon creation of MasterList.vue component,  mySQL database sent to server, and then server sends the data to the front-end (AKA response data). We then insert this data into the masterList array in the data instance.*/
  created() {
    axios.get('http://127.0.0.1:3000')
      .then((response) => {
        console.log(response);
        this.masterList=response.data
        this.filteredList=response.data
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('http://127.0.0.1:3000/getgrocerylistname')
      .then((response) => {
        console.log(response);
        this.groceryList=response.data
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://127.0.0.1:3000/qtyfromfinal')
        .then((response) => {
          console.log(response);
          this.groceryListFinal=response.data

        })
        .catch((error) => {
          console.log(error);
        })
    }

}

</script>

<style>
.marginAuto {
  margin:auto;
}
.title {
  font-weight:bold;
  font-size:25px;
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
  .lineSpacing {
    line-height:30px;
    font-size:17px;
  }
  .align {
    margin:auto;
    text-align:center;

  }
  .flex {
    display:flex;
    margin:auto;
    text-align:center;
    border-bottom:solid 2px #00ace6;
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
