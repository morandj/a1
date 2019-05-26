<template>
  <div class="container mx-auto h-full flex justify-center items-center m-2">
    <img alt="fox logo" src="@/assets/fox.png" class="h-10 w-10 p-1">
    <ul class="list-reset flex">
      <template v-for="(item, index) in items">
        <li v-if="isAuthenticated == item.authReq" :key="index" class>
          <router-link
            :to="item.to"
            class="no-underline mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
          >{{ item.title }}</router-link>
        </li>
      </template>

      <template>
        <button v-if="isAuthenticated && isMaster">
          <router-link
            to="/newhunt"
            class="no-underline mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
          >New Hunt</router-link>
        </button>
        <button
          v-if="isAuthenticated"
          @click="signOut"
          class="mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
        >Sign Out</button>
        <button
          @click="logState"
          class="mr-3 inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white"
        >state</button>
        <button
          @click="toggleMasterPlayer"
          class="bg-blue-500 hover:bg-blue-900 mr-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >{{ isM ? 'M' : 'P' }}</button>
      </template>
    </ul>
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
      // eslint-disable-next-line
      console.log("state:", this.$store.state);
    }
  }
};
</script>
