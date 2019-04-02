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
          @click="logCurrentHunt"
          class="inline-block border border-blue rounded py-1 px-3 bg-blue text-white"
        >CH</button>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      items: [
        { title: "Home", to: "/", authReq: true, level: 0 },
        { title: "Sign In", to: "/signin", authReq: false, level: 0 },
        { title: "Sign Up", to: "/signup", authReq: false, level: 0 },
        { title: "Browse", to: "/", authReq: false, level: 0 },
        { title: "New", to: "/newhunt", authReq: true, level: 3 },
        { title: "?", to: "/", authReq: false, level: 3 }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("userSignOut");
    },
    logCurrentHunt() {
      console.log("currentHunt:", this.$store.getters.currentHunt);
      console.log(":", this.$store.state.hunts);
    }
  }
};
</script>
