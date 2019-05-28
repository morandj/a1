<template >
  <div>
    <!-- Modal -->
    <template>
      <div v-if="modal" @click.self="toggleModal" class="flex fixed inset-0 z-50 overflow-auto">
        <div
          class="relative p-4 bg-gray-200 w-full max-w-sm m-auto flex flex-col border-2 border-gray-500 rounded-lg"
        >
          <div class="flex flex-col">
            <span @click="toggleModal" class="absolute top-0 bottom-0 right-0 p-4">
              <svg
                class="h-12 w-12 fill-current text-gray-600 hover:text-gray-900"
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
            <div class="text-center text-1xl">
              Clue No.
              <span class="text-3xl">{{ this.number }}</span>
            </div>
          </div>
          <div
            class="whitespace-pre-wrap bg-gray-100 py-2 px-3 border border-gray-500 rounded-t m-3 mb-1"
          >{{ this.question }}</div>

          <div class="py-2 px-3">
            <input
              name="answer"
              v-model="playerResponse.clueResponses[index].response"
              class="px-3 py-1 border border-gray-500 rounded-b w-full mb-3"
            >
          </div>
          <button
            @click="saveAnswer"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Save Answer</button>
        </div>
      </div>
    </template>

    <!-- Clues -->
    <template>
      <div class="bg-gray-200 flex flex-wrap rounded-lg">
        <div v-for="(clue, index) in clues" :clue="clue" :key="index" class>
          <button
            class="bg-gray-200 leading-none ml-3 mt-2 mb-2 hover:bg-gray-300 text-gray-900 text-4xl font-bold py-4 px-6 rounded-lg focus:outline-none focus:shadow-outline"
            :class="[playerResponse.clueResponses[index].response.trim() ? 'bg-green-400' : 'bg-red-400']"
            @click="clueClicked(clue, index)"
          >{{ clue.number }}</button>
        </div>
      </div>
    </template>

    <!-- :class="[playerResponse.clueResponses[index].answer.trim() ? 'bg-green-500' : 'bg-red-400']" -->
    <!-- :class="{ 'opacity-0': modal }" -->
  </div>
</template>

<script>
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
      // eslint-disable-next-line
      console.log("A", this.$store.getters.currentClueAnswers);
      // console.log("H:", this.$store.getters.currentHunt);
      return this.$store.getters.currentClueAnswers;
    },
    playerResponse() {
      // eslint-disable-next-line
      console.log("playerResponse:", this.$store.getters.playerResponse);
      return this.$store.getters.playerResponse;
    }
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal;
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
  components: {}
};
</script>
