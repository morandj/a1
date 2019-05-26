<template>
  <div class="container mx-auto flex justify-center m-4">
    <!-- <p>{{ $route.params.id }}</p> -->
    <div class="w-full max-w-sm">
      <h1 class>Edit Hunt</h1>
      <form @submit.prevent class="bg-white shadow-md rounded px-6 pt-4 pb-6 mb-4">
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="title">Title</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            v-model.trim="hunt.huntData.title"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            rows="10"
            v-model.trim="hunt.huntData.description"
          ></textarea>
        </div>
        <div>
          <button
            @click="showClues = !showClues"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >{{ showClues ? 'Hide' : 'Show' }} Clues</button>
          <edit-clues v-if="showClues"></edit-clues>
        </div>

        <div>
          <button
            @click="showScavs = !showScavs"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >{{ showScavs ? 'Hide' : 'Show' }} Scavs</button>
          <edit-scavs v-if="showScavs"></edit-scavs>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="updateHunt"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Update Hunt</button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">©2019 Hunts. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
import EditClues from "@/components/EditClues";
import EditScavs from "@/components/EditScavs";
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
      showClues: true,
      showScavs: true
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
    EditClues,
    EditScavs
    // NewClue
  }
};
</script>
