<template>
  <div class="container mx-auto h-full flex justify-center items-center m-2">
    <!-- <img alt="fox logo" src="@/assets/fox.png" class="h-10 w-10 p-1"> -->
    <!-- <ul class> -->
    <!-- <clue v-for="(clue, index) in clues" :clue="clue" :key="index"></clue> -->
    <template>
      <div
        v-for="(clue, index) in clues"
        :clue="clue"
        :key="index"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      >
        <textarea name="question" v-model="clue.question"></textarea>
        <textarea name="answer" v-model="clue.answer"></textarea>
      </div>
    </template>
    <!-- </ul> -->
  </div>
</template>


<script>
// import Clue from "@/components/Clue";
export default {
  name: "Clues",
  props: [],
  data() {
    return {};
  },
  computed: {
    clues() {
      return this.$store.getters.clues;
    }
  },
  methods: {},
  components: {
    // Clue
  }
};
</script>
