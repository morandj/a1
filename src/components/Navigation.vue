<template>
  <div class="container mx-auto h-full flex justify-center items-center mt-3">
    <img alt="fox logo" src="@/assets/fox.png" class="h-10 w-10 p-1">
    <ul class="flex">
      <template v-for="(item, index) in items">
        <li v-if="isAuthenticated == item.authReq" :key="index" class>
          <router-link
            :to="item.to"
            class="mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
          >{{ item.title }}</router-link>
        </li>
      </template>
    </ul>
    <template>
      <button v-if="isAuthenticated && isMaster">
        <router-link
          to="/newhunt"
          class="mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
        >New Hunt</router-link>
      </button>
      <button
        v-if="isAuthenticated"
        @click="signOut"
        class="mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
      >Sign Out</button>
      <button
        @click="logState"
        class="bg-orange-500 hover:bg-orange-700 border border-orange-500 mr-3 rounded py-1 px-3 text-white"
      >state</button>
      <button
        @click="toggleMasterPlayer"
        class="bg-pink-500 hover:bg-pink-700 border border-pink-500 focus:outline-none focus:shadow-outline w-1/3inline-block mr-3 py-1 px-4 rounded text-white"
        type="button"
      >{{ isM ? 'M' : 'P' }}</button>
    </template>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      isM: true,
      items: [
        { title: "Home", to: "/", authReq: true },
        { title: "Hunts", to: "/showhunts", authReq: true },
        { title: "Sign In", to: "/signin", authReq: false },
        { title: "Sign Up", to: "/signup", authReq: false }
        // { title: "New", to: "/newhunt", authReq: true }
        // { title: "?", to: "/", authReq: false, level: 3 }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isMaster() {
      return this.$store.getters.isMaster;
    }
  },
  methods: {
    // for dev only
    toggleMasterPlayer() {
      // eslint-disable-next-line
      console.log(
        "isMaster",
        this.$store.state.isMaster,
        ", isPlayer",
        this.$store.state.isPlayer
      );
      this.$store.dispatch("toggleMasterPlayer");
      this.isM ? (this.isM = false) : (this.isM = true);
    },
    signOut() {
      this.$store.dispatch("userSignOut");
    },
    logState() {
      // dev only
      // eslint-disable-next-line
      console.log("state:", this.$store.state);
    }
  }
};
</script>
