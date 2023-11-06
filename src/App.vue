<template>
  <div class="app">
    <SideBar/>
    <router-view />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SideBar from "./components/common/SideBar.vue";

export default defineComponent({
  name: 'App',
  components: {SideBar}
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  list-style: none;
  box-sizing: border-box;
  text-decoration: none;
}
body {
  background-color: #F6F6F6;;
}
.app {
  display: flex;
  justify-content: center;
}
</style>
