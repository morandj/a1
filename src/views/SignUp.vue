<template>
  <div id="signup" class="container mx-auto flex justify-center m-4">
    <div class="w-full max-w-xs">
      <form @submit.prevent class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="username">Name</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            v-model.trim="signUpForm.name"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="email">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            v-model.trim="signUpForm.email"
          >
        </div>
        <div class="mb-6">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            v-model.trim="signUpForm.password"
          >
          <p class="text-red text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="signUp"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Sign Up</button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">©2019 Hunts. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpForm: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      // eslint-disable-next-line
      console.log(
        "signUn:",
        this.signUpForm.name,
        this.signUpForm.email,
        this.signUpForm.password
      );
      this.$store.dispatch("userSignUp", {
        name: this.signUpForm.name,
        email: this.signUpForm.email,
        password: this.signUpForm.password
      });
      // fb.auth
      //   .createUserWithEmailAndPassword(
      //     this.signUpForm.email,
      //     this.signUpForm.password
      //   )
      //   .then(cred => {
      //     this.$store.commit("setCurrentUser", cred.user);
      //     fb.usersCollection
      //       .doc(cred.uid)
      //       .set({
      //         name: this.signUpForm.name
      //       })
      //       .then(() => {
      //         this.$store.dispatch("getUserProfile");
      //         this.$router.push("/dashboard");
      //       })
      //       .catch(err => {
      //         console.log("Error getting user's profile", err);
      //       });
      //   })
      //   .catch(err => {
      //     console.log("Sign Up error", err);
      //   });
    }
  }
};
</script>
