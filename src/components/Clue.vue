<template>
  <div
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
  >
    <textarea name="question" :value="question"></textarea>
    <textarea name="answer" :value="answer"></textarea>
  </div>
</template>

<script>
export default {
  name: "Clue",
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
