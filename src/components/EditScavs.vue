<template>
  <div class="container mx-auto h-full flex flex-col justify-center items-center m-2">
    <template>
      <div
        v-for="(scav, index) in scavs"
        :scav="scav"
        :key="index"
        class="shadow border rounded w-full py-2 px-3 flex flex-col"
      >
        <div class="flex flex-row py-1">
          <div class="flex flex-col justify-between mr-2 py-2">
            <div>Scav No.</div>
            <div class="text-center text-5xl">{{ scav.number }}</div>
            <div class>Answer</div>
          </div>
          <div class="flex flex-col flex-auto">
            <textarea
              :readonly="isPlayer"
              name="question"
              v-model="scav.question"
              rows="6"
              class="py-2 px-3 border rounded-t"
            ></textarea>
            <input
              name="answer"
              v-model="masterSolution.scavAnswers[index].answer"
              class="px-3 py-1 border border-gray-500 rounded-b"
            >
          </div>
        </div>
        <div v-if="!isPlayer">
          <button
            @click="deleteScav(index)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Delete</button>
        </div>
      </div>
    </template>
    <!-- Add New Scavenger -->
    <template>
      <div
        v-if="!isPlayer"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
      >
        <textarea name="question" required v-model="question"></textarea>
        <input name="answer" required v-model="answer">
        <button @click="addScav" class="btn btn-green" type="button">Add Scavenger</button>
      </div>
    </template>
  </div>
</template>

<script>
// import Scav from "@/components/Scav";
export default {
  name: "EditScavs",
  props: [],
  data() {
    return {
      question: "",
      answer: ""
      // newScav: {
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
    scavs() {
      return this.$store.getters.scavs;
    },
    answers() {
      console.log("A", this.$store.getters.currentClueAnswers);
      // console.log("H:", this.$store.getters.currentHunt);
      return this.$store.getters.currentClueAnswers;
    },
    masterSolution() {
      return this.$store.getters.masterSolution;
    }
  },
  methods: {
    addScav() {
      // eslint-disable-next-line
      //console.log("newScav:", this.newScav, "newAnswer:", this.newAnswer);
      // eslint-disable-next-line
      console.log("addScav: adding new scav");
      let scavNumber = this.scavs.length + 1;
      let newScav = { number: null, question: null };
      newScav.number = scavNumber;
      // newScav.question = this.question;
      let newAnswer = { number: null, answer: null };
      newAnswer.number = scavNumber;
      // newAnswer.answer = this.answer;
      // eslint-disable-next-line
      console.log("newScav:", newScav, "newAnswer:", newAnswer);
      this.scavs.push(newScav);
      this.masterSolution.scavAnswers.push(newAnswer);
      this.question = "";
      this.answer = "";
    },
    deleteScav(index) {
      // eslint-disable-next-line
      console.log("deleteScav:", index);

      let idx; // for re-numbering

      this.scavs.splice(index, 1);
      // re-number scavs
      idx = 0;
      this.scavs.forEach(element => {
        idx += 1;
        element.number = idx;
      });

      this.masterSolution.scavAnswers.splice(index, 1);

      // re-number answers
      idx = 0;
      this.masterSolution.scavAnswers.forEach(element => {
        idx += 1;
        element.number = idx;
      });
    }
  },
  components: {
    // Scav
  }
};
</script>
