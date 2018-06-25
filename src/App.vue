<template>
  <div id="app">
    <img src="">
    <h1 class="title mainTitleColor">{{ msg }}</h1>
    <button class="navBtn"><a href="/" class="link navBtnText">home</a></button>
    <button class="navBtn"><router-link to="/masterlist" class="link navBtnText">Master List</router-link></button>
    <button class="navBtn"><router-link to ="/additem" class="link navBtnText">Add Items</router-link></button>
    <button class="navBtn"><router-link to ="/creategrocerylist" class="link navBtnText">Create Grocery List</router-link></button>
    <button class="navBtn"><router-link to ="/listofgrocerylists" class="link navBtnText">List of Grocery Lists</router-link></button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Grocery App'
    }
  }
}
</script>

<style>
.title {
  font-weight:bold;
  font-size:25px;
}
.mainTitleColor {
  background:-webkit-linear-gradient(green,blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color:transparent;
}
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
