<template>
  <div class="container mx-auto h-full flex flex-col justify-center items-center m-2">
    <template>
      <div
        v-for="(clue, index) in clues"
        :clue="clue"
        :key="index"
        class="shadow border rounded w-full py-2 px-3 flex flex-col"
      >
        <div class="flex flex-row py-1">
          <div class="flex flex-col justify-between mr-2 py-2">
            <div>Clue No.</div>
            <div class="text-center text-5xl">{{ clue.number }}</div>
            <div class>Answer</div>
          </div>
          <div class="flex flex-col flex-auto">
            <textarea
              :readonly="isPlayer"
              name="question"
              v-model="clue.question"
              rows="6"
              class="py-2 px-3 border rounded-t"
            ></textarea>
            <input
              name="answer"
              v-model="masterSolution.clueAnswers[index].answer"
              class="px-3 py-1 border border-grey rounded-b"
            >
          </div>
        </div>
        <div v-if="!isPlayer">
          <button
            @click="deleteClue(index)"
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Delete</button>
        </div>
      </div>
    </template>
    <!-- Add New Clue -->
    <template>
      <div
        v-if="!isPlayer"
        class="shadow appearance-none border rounded mt-2 w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      >
        <!-- <textarea name="question" required v-model="question"></textarea> -->
        <!-- <input name="answer" required v-model="answer"> -->
        <button @click="addClue" class="btn btn-green" type="button">Add Clue</button>
      </div>
    </template>
  </div>
</template>

<script>
// import Clue from "@/components/Clue";
export default {
  name: "EditClues",
  props: [],
  data() {
    return {
      question: "",
      answer: ""
      // newClue: {
      //   number: null,
      //   question: ""
      // },
      // newAnswer: { answer: "" }
    };
  },
  computed: {
    isPlayer() {
      return this.$store.getters.isPlayer;
    },
    clues() {
      console.log("C", this.$store.getters.clues);
      return this.$store.getters.clues;
    },
    answers() {
      console.log("A", this.$store.getters.currentClueAnswers);
      // console.log("H:", this.$store.getters.currentHunt);
      return this.$store.getters.currentClueAnswers;
    },
    masterSolution() {
      return this.$store.getters.masterSolution;
    },
    masterClueAnswers() {
      console.log("masterClueAnswers:", this.$store.getters.masterClueAnswers);
      return this.$store.getters.masterClueAnswers;
    }
  },
  methods: {
    addClue() {
      // eslint-disable-next-line
      //console.log("newClue:", this.newClue, "newAnswer:", this.newAnswer);
      // eslint-disable-next-line
      console.log("addClue: adding new clue");
      let clueNumber = this.clues.length + 1;
      let newClue = { number: null, question: null };
      newClue.number = clueNumber;
      // newClue.question = this.question;
      // newClue.question = null;
      let newAnswer = { number: null, answer: null };
      newAnswer.number = clueNumber;
      // newAnswer.answer = this.answer;
      // eslint-disable-next-line
      console.log("newClue:", newClue, "newAnswer:", newAnswer);
      this.clues.push(newClue);
      this.masterSolution.clueAnswers.push(newAnswer);
      this.question = "";
      this.answer = "";
      // eslint-disable-next-line
      console.log(
        "clues:",
        this.clues,
        "answers:",
        this.masterSolution.clueAnswers
      );
    },
    deleteClue(index) {
      // eslint-disable-next-line
      console.log("deleteClue:", index);

      let idx; // for re-numbering

      this.clues.splice(index, 1);

      // re-number clues
      idx = 0;
      this.clues.forEach(element => {
        idx += 1;
        element.number = idx;
      });

      this.masterSolution.clueAnswers.splice(index, 1);

      // re-number answers
      idx = 0;
      this.masterSolution.clueAnswers.forEach(element => {
        idx += 1;
        element.number = idx;
      });
    }
  },
  components: {
    // Clue
  }
};
</script>
