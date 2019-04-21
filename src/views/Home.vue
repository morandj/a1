<template>
  <div class="container mx-auto flex flex-col justify-center m-4 max-w-md w-full">
    <span v-if="loading" class="spinner"></span>
    <ul class="list-reset">
      <li v-for="(hunt, index) in hunts" :key="index" class="m-3 px-6 py-4 rounded shadow">
        <div class="flex flex-col justify-start">
          <div class="font-bold mb-1">{{ hunt.huntData.title }}</div>
          <div class="mb-2">{{ hunt.huntData.description }}</div>
        </div>
        <button
          v-if="isAuthenticated && isPlayer"
          @click="playHunt(index)"
          class="btn btn-blue flex justify-end"
        >Play</button>
        <button
          v-if="isAuthenticated && isMaster"
          @click="editHunt(index)"
          class="btn btn-green"
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isMaster() {
      return this.$store.getters.isMaster;
    },
    isPlayer() {
      return this.$store.getters.isPlayer;
    },
    loading() {
      return this.$store.getters.loading;
    },
    hunts() {
      return this.$store.getters.hunts;
    }
  },
  methods: {
    editHunt(index) {
      // eslint-disable-next-line
      console.log("(1)...editHunt: ", index);
      this.$store.dispatch("getCurrentHunt", index).then(() => {
        console.log("(6)...Current hunt got:", this.$store.state.currentHunt);
        this.$router.push({ name: "edithunt", params: { index } });
      });
    },
    playHunt(index) {
      // eslint-disable-next-line
      console.log("(1)...playHunt: ", this.hunts[index]);
      this.$store.dispatch("getCurrentHunt", index).then(() => {
        console.log(
          "(6)...Current hunt got in home/playhunt:",
          this.$store.state.currentHunt
        );
        this.$router.push({ name: "playhunt", params: { index } });
      });
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

