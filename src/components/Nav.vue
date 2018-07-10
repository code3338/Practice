<div id="app">
  <nav id="topNav">
    <button class="navBtn"><a href="/home" class="link navBtnText">home</a></button>
    <button class="navBtn"><router-link to="/masterlist" class="link navBtnText">Master List</router-link></button>
    <button class="navBtn"><router-link to ="/additem" class="link navBtnText">Add Items</router-link></button>
    <button class="navBtn"><router-link to ="/creategrocerylist" class="link navBtnText">Create Grocery List</router-link></button>
    <button class="navBtn"><router-link to ="/listofgrocerylists" class="link navBtnText">List of Grocery Lists</router-link></button>
    <router-view></router-view>
  </nav>
</div>
</template>

<script>
export default {
name: 'loggedin',
data () {
 }
}
</script>

<style>

.navBtn {
background-color:#009900;
border-radius: 2px;
box-shadow:2px 2px 9px gray;
}
.navBtn:hover {
color:white;
background-color:#00b33c;
box-shadow:2px 2px 9px #4da6ff;
cursor:pointer;
}
.navBtnText {
color:white;
font-weight:bold;
font-size:18px;
}
.navBtnText:hover {
color:white;
}
.link {
text-decoration: none;
}
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 60px;
}

a {
color: #42b983;
}
</style>
