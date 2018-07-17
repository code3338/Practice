<template>
  <div id="app">
    <footer id="copyright">@ Copyright {{copyrightFooter}}</footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    /*Create a new object from the Date constructor function, and access the getFullYear() method from the new object*/
    copyrightFooter: function() {
      let d = new Date();
      return d.getFullYear();
    }
  }
}
</script>
<style>
  #copyright {
    position:relative;
    bottom:0px;
  }
</style>
