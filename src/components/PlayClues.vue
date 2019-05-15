

<template>
  <div class>
    <template>
      <div>
        <!-- <div v-show="modal" @click.self="toggleModal" class="overflow-auto flex">CLUE</div> -->
        <div class="flex flex-row py-1">
          <div
            v-if="modal"
            @click.self="toggleModal"
            class="fixed pin z-50 overflow-auto bg-trans flex"
          >
            <div class="relative p-8 bg-white w-full max-w-sm m-auto flex-col flex rounded-lg">
              <span @click="toggleModal" class="absolute pin-t pin-b pin-r p-4">
                <svg
                  class="h-12 w-12 fill-current text-grey hover:text-grey-darkest"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10 30"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  ></path>
                </svg>
              </span>
              <div class="text-center text-2xl">{{ this.number }}</div>
              <div class="whitespace-pre-wrap m-3">{{ this.question }}</div>
              <!-- <div>Index: {{this.index }} Answer: {{ this.answer }}</div> -->
              <div class="py-2 px-3 border rounded-t">
                <input
                  name="answer"
                  v-model="playerResponse.clueResponses[index].response"
                  class="px-3 py-1 border border-grey rounded-b"
                >
              </div>
              <button
                @click="saveAnswer"
                class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >Save Answer</button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template>
      <div class="bg-grey-lighter mt-2 flex flex-wrap rounded-lg">
        <div v-for="(clue, index) in clues" :clue="clue" :key="index" class>
          <button
            class="min-w-90 max-w-90 bg-grey-lighter ml-3 mt-2 mb-2 hover:bg-grey-lightest text-grey-darkest text-4xl font-bold py-4 px-6 rounded-lg"
            :class="[playerResponse.clueResponses[index].response.trim() ? 'bg-green' : 'bg-red-light']"
            @click="clueClicked(clue, index)"
          >{{ clue.number }}</button>
        </div>
      </div>
    </template>
    <!-- :class="[playerResponse.clueResponses[index].answer.trim() ? 'bg-green' : 'bg-red-light']" -->
  </div>
</template>

<script>
// import Clue from "@/components/Clue";
export default {
  name: "PlayClues",
  props: [],
  data() {
    return {
      modal: false,
      number: 0,
      index: 0,
      question: "",
      answer: ""
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
      console.log("A", this.$store.getters.currentClueAnswers);
      // console.log("H:", this.$store.getters.currentHunt);
      return this.$store.getters.currentClueAnswers;
    },
    playerResponse() {
      console.log("playerResponse:", this.$store.getters.playerResponse);
      return this.$store.getters.playerResponse;
    }
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal;
    },
    clueStatus(index) {
      let status;
      console.log("index:", index);
      console.log(this.clues.length, this.playerResponse.clueResponses.length);
      // if ((this.playerResponse.clueResponses.length = this.clues.length)) {
      //   status = this.playerResponse.clueResponses[index].answer.trim();
      // } else {
      //   status = false;
      // }
      return ["bg-red-light"];
    },
    clueClicked(clue, index) {
      this.index = index;
      this.number = clue.number;
      this.question = clue.question;
      this.answer = this.playerResponse.clueResponses[index].response;
      this.modal = !this.modal;
    },
    saveAnswer() {
      // this.$store.dispatch("updateAnswers");
      this.$store.dispatch("updatePlayerResponse");
      this.modal = !this.modal;
    }
  },
  components: {
    // Clue
  }
};
</script>
