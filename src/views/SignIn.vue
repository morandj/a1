<template>
  <div id="signin" class="container mx-auto flex justify-center m-4">
    <!-- <h1 class="w-full max-w-xs">SIGNIN</h1> -->
    <div class="w-full max-w-xs">
      <form
        @submit.prevent
        class="container mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            v-model.trim="signInForm.email"
          >
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            v-model.trim="signInForm.password"
          >
          <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="signIn"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Sign In</button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
            href="#"
          >Forgot Password?</a>
        </div>
      </form>
      <p class="text-center text-gray-500  text-xs">©2019 Hunts. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
// const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {
      signInForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
      // eslint-disable-next-line
      console.log("signIn:", this.signInForm.email, this.signInForm.password);
      this.$store.dispatch("userSignIn", {
        email: this.signInForm.email,
        password: this.signInForm.password
      });
    }
  }
};
</script>
