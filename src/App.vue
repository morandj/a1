<template >
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>
<style>
@import "./assets/css/main.css";
</style>
