"use strict"

import AddItem from "./components/AddItem.vue";
import CreateGroceryList from "./components/CreateGroceryList.vue";
import ListofGroceryLists from "./components/ListofGroceryLists.vue";
import MasterList from "./components/MasterList.vue";
import UpdateGroceryList from "./components/UpdateGroceryList.vue";
import UpdateItem from "./components/UpdateItem.vue";
import ViewGroceryList from "./components/ViewGroceryList.vue";
import VueRouter from "vue-router";

const router = new VueRouter ({
  mode:"history", /*Allows us to hit back arrow*/
  routes: [
    {path:"/masterlist", component:MasterList},
    {path:"/additem", component:AddItem},
    {path:"/creategrocerylist", component:CreateGroceryList},
    {path:"/listofgrocerylists", component:ListofGroceryLists},
    {path:"/viewgrocerylist/:id", component:ViewGroceryList},
    {path:"/updategrocerylist/:id", component:UpdateGroceryList},
    {path:"/updateitem/:id", component:UpdateItem}
  ]
})
export default router;
