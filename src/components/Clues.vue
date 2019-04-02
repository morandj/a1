<template>
  <div class="container mx-auto h-full flex flex-col justify-center items-center m-2">
    <template>
      <div
        v-for="(clue, index) in clues"
        :clue="clue"
        :key="index"
        class="shadow border rounded w-full py-2 px-3"
      >
        <div>{{ clue.number }}</div>
        <textarea
          :readonly="isPlayer"
          name="question"
          v-model="clue.question"
          rows="5"
          class="border rounded-t"
        ></textarea>
        <input name="answer" v-model="answers[index]" class="border rounded-b">
        <button
          @click="deleteClue(index)"
          class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >Delete</button>
      </div>
    </template>
    <template>
      <div
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      >
        <textarea name="question" required v-model="question"></textarea>
        <input name="answer" required v-model="answer">
        <button @click="addClue" class="btn btn-green" type="button">Add Clue</button>
      </div>
    </template>
  </div>
</template>

<script>
// import Clue from "@/components/Clue";
export default {
  name: "Clues",
  props: [],
  data() {
    return {
      question: "",
      answer: "",
      newClue: {
        number: null,
        question: "",
        answer: ""
      }
    };
  },
  computed: {
    isPlayer() {
      return this.$store.getters.isPlayer;
    },
    clues() {
      return this.$store.getters.clues;
    },
    answers() {
      console.log("A", this.$store.getters.currentAnswers);
      console.log("H:", this.$store.getters.currentHunt);
      return this.$store.getters.currentAnswers;
    }
  },
  methods: {
    addClue() {
      // eslint-disable-next-line
      console.log("addClue: adding new clue");
      this.newClue.number = this.clues.length + 1;
      this.newClue.question = this.question;
      this.newClue.answer = this.answer;
      // eslint-disable-next-line
      console.log(
        "newClue:",
        this.newClue.number,
        this.newClue.question,
        this.newClue.answer
      );

      this.clues.push(this.newClue);
      this.question = "";
      this.answer = "";
    },
    deleteClue(index) {
      // eslint-disable-next-line
      console.log("deleteClue:", index);
      this.clues.splice(index, 1);
    }
  },
  components: {
    // Clue
  }
};
</script>
