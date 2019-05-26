<template>
  <div class="container mx-auto flex justify-center m-4">
    <h1>Home</h1>
    <span v-if="loading" class="spinner"></span>
    <ul class="max-w-md w-full">
      <li
        v-for="(hunt, index) in hunts"
        :key="index"
        class="m-3 px-6 py-4 rounded shadow lg:flex flex-col"
      >
        <div class="font-bold">{{ hunt.title }}</div>
        <div>{{ hunt.description }}</div>
        <button
          @click="playHunt(index)"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >Play</button>
        <button
          @click="editHunt({ id: hunt.id, idx: index })"
          class="bg-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    hunts() {
      return this.$store.getters.hunts;
    }
  },
  methods: {
    editHunt(x) {
      let id = x.idx;
      // eslint-disable-next-line
      console.log("editHunt: ", x.idx, id);
      this.$store.dispatch("setCurrentHunt", id);
      this.$router.push({ name: "edithunt", params: { id } });
    },
    playHunt(x) {
      // eslint-disable-next-line
      console.log("playHunt: ", this.hunts[x]);
    }
  },
  name: "home",
  components: {
    // HelloWorld
  }
};
</script>
<style scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border-top: 2px solid #07d;
  border-right: 2px solid transparent;
  animation: spinner 0.6s linear infinite;
}
</style>

