<template>
  <div class="container mx-auto flex justify-center m-4">
    <!-- <p>{{ $route.params.id }}</p> -->
    <div class="w-full max-w-sm">
      <h1 class>Edit Hunt</h1>
      <form @submit.prevent class="bg-white shadow-md rounded px-6 pt-4 pb-6 mb-4">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="title">Title</label>
          <input
            :readonly="isPlayer"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            v-model.trim="hunt.huntData.title"
          >
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            :readonly="isPlayer"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            rows="10"
            v-model.trim="hunt.huntData.description"
          ></textarea>
        </div>
        <div>
          <p>Clues</p>
          <button
            @click="showClues = !showClues"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >{{ showClues ? 'Hide' : 'Show' }} Clues</button>
          <clues v-if="showClues"></clues>
          <!-- <new-clue></new-clue> -->
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
// import NewClue from "@/components/NewClue";
export default {
  computed: {
    isPlayer() {
      return this.$store.getters.isPlayer;
    },
    hunt() {
      // eslint-disable-next-line
      console.log("computed:", this.$route.params.index);
      return this.$store.getters.currentHunt;
    }
  },
  data() {
    return {
      showClues: true
    };
  },
  methods: {
    updateHunt() {
      // eslint-disable-next-line
      console.log(
        "EditHunt/updateHunt:",
        this.hunt,
        this.hunt.huntData.title,
        this.hunt.huntData.description
      );
      this.$store.dispatch("updateHunt", this.hunt);
    }
  },
  components: {
    Clues
    // NewClue
  }
};
</script>
