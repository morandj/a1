<template>
  <div class="container mx-auto flex justify-center m-4">
    <h1>Edit Hunt</h1>
    <!-- <p>{{ $route.params.id }}</p> -->
    <div class="w-full max-w-xs">
      <form @submit.prevent class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="title">Title</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            v-model.trim="hunt.title"
          >
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            v-model.trim="hunt.description"
          ></textarea>
        </div>
        <!-- <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
          id="clues"
          type="text"
          placeholder
          v-model.trim="hunt.clues[0].question
          "
        >-->
        <div>
          <clues></clues>
          <new-clue></new-clue>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click="updateHunt"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Update Hunt</button>
        </div>
      </form>
      <p class="text-center text-grey text-xs">©2019 Hunts. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import Clues from "@/components/Clues";
import NewClue from "@/components/NewClue";
export default {
  computed: {
    hunt() {
      console.log("computed:", this.$route.params.id);
      return this.$store.getters.currentHunt;
    }
  },
  data() {
    return {
      // huntForm: {
      //   title: "",
      //   description: "",
      //   clues: [],
      //   scavs: [],
      //   notes: "",
      //   date: null
      // }
    };
  },
  methods: {
    updateHunt() {
      console.log(
        "updateHunt:",
        this.hunt,
        this.hunt.title,
        this.hunt.description
      );
      this.$store.dispatch(
        "updateHunt",
        this.hunt
        // this.hunt
        // title: this.hunt.title,
        // description: this.hunt.description
      );
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
  },
  components: {
    Clues,
    NewClue
  }
};
</script>
