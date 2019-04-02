<template>
  <div>
    <h1>New Hunt</h1>
    <div class="w-full max-w-xs">
      <form @submit.prevent class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="title">Title</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            v-model.trim="huntForm.title"
          >
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            v-model.trim="huntForm.description"
          ></textarea>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="addHunt"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Add New Hunt</button>
        </div>
      </form>
      <p class="text-center text-grey text-xs">©2019 Hunts. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      huntForm: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    addHunt() {
      // eslint-disable-next-line
      console.log("addHunt:", this.huntForm.title, this.huntForm.description);
      this.$store.dispatch("addHunt", {
        title: this.huntForm.title,
        description: this.huntForm.description
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
