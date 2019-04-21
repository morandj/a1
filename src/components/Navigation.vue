<template>
  <div class="container mx-auto h-full flex justify-center items-center m-2">
    <img alt="fox logo" src="@/assets/fox.png" class="h-10 w-10 p-1">
    <ul class="list-reset flex">
      <template v-for="(item, index) in items">
        <li v-if="isAuthenticated == item.authReq" :key="index" class="mr-3">
          <router-link
            :to="item.to"
            class="inline-block border border-blue rounded py-1 px-3 bg-blue text-white"
          >{{ item.title }}</router-link>
        </li>
      </template>
      <template>
        <button
          v-if="isAuthenticated"
          @click="signOut"
          class="inline-block border border-blue rounded py-1 px-3 bg-blue text-white"
        >Sign Out</button>
        <button
          @click="logState"
          class="inline-block border border-blue rounded py-1 px-3 bg-blue text-white"
        >state</button>
        <button
          @click="toggleMasterPlayer"
          class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        { title: "Home", to: "/", authReq: true, level: 0 },
        { title: "Sign In", to: "/signin", authReq: false, level: 0 },
        { title: "Sign Up", to: "/signup", authReq: false, level: 0 },
        // { title: "Browse", to: "/", authReq: false, level: 0 },
        { title: "New", to: "/newhunt", authReq: true, level: 3 }
        // { title: "?", to: "/", authReq: false, level: 3 }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
