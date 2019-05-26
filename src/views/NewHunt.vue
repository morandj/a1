<template>
  <div id="newhunt" class="container mx-auto flex justify-center m-4">
    <div class="w-full max-w-xs">
      <h1>New Hunt</h1>
      <form @submit.prevent class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="title">Title</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            v-model.trim="huntForm.title"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            v-model.trim="huntForm.description"
          ></textarea>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="addHunt"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Add New Hunt</button>
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
    }
  }
};
</script>
