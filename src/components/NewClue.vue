<template>
  <div
    class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
  >
    <textarea name="question" required></textarea>
    <textarea name="answer" required></textarea>
    <button
      @click="addClue"
      class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >Add Clue</button>
  </div>
</template>

<script>
export default {
  name: "NewClue",
  props: ["clue"],
  data() {
    return {};
  },
  computed: {
    question() {
      return this.clue.question;
    },
    answer() {
      return this.clue.answer;
    }
  },
  methods: {
    addClue() {},
    edit() {
      this.$store.dispatch("");
    },
    save() {
      this.$store.dispatch("");
    },
    delete() {
      this.$store.dispatch("");
    }
  }
};
</script>
