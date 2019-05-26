import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import {auth, db} from ".firebaseConfig";
// import "./assets/css/main.css";
// const fb = require("./firebaseConfig.js");
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // eslint-disable-next-line
    console.log("created()... in main.js");
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.dispatch("autoSignIn", user);
    //   }
    // });
    // eslint-disable-next-line
    // console.log("dispatching... getHunts");
    //this.$store.dispatch("getHunts");
  }
}).$mount("#app");

// let app;
// fb.auth.onAuthStateChanged(user => {
//   if (!app) {
//     new Vue({
//       router,
//       store,
//       render: h => h(App)
//     }).$mount("#app");
//   }
// });
