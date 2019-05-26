

<template>
  <div class>
    <template>
      <div>
        <!-- <div v-show="modal" @click.self="toggleModal" class="overflow-auto flex">SCAV</div> -->
        <div class="flex flex-row py-1">
          <div
            v-if="modal"
            @click.self="toggleModal"
            class="fixed pin z-50 overflow-auto bg-trans-500 flex"
          >
            <div class="relative p-8 bg-white w-full max-w-sm m-auto flex-col flex rounded-lg">
              <span @click="toggleModal" class="absolute pin-t pin-b pin-r p-4">
                <svg
                  class="h-12 w-12 fill-current text-gray-500 hover:text-gray-900"
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
              <!-- <div class="py-2 px-3 border rounded-t">
                <input
                  name="answer"
                  v-model="playerResponse.scavResponses[index].response"
                  class="px-3 py-1 border border-gray-500 rounded-b"
                >
              </div>-->
              <div class="flex justify-around">
                <button
                  @click="saveAnswer(index,'')"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >Not done</button>
                <button
                  @click="saveAnswer(index, 'true')"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template>
      <div class="bg-gray-200 mt-2 flex flex-wrap rounded-lg">
        <div v-for="(scav, index) in scavs" :scav="scav" :key="index" class>
          <button
            class="min-w-90 max-w-90 bg-gray-200 ml-3 mt-2 mb-2 hover:bg-gray-900 text-gray-900 text-4xl font-bold py-4 px-6 rounded-lg"
            :class="[playerResponse.scavResponses[index].response.trim() ? 'bg-green-500' : 'bg-red-400']"
            @click="scavClicked(scav, index)"
          >{{ scav.number }}</button>
        </div>
      </div>
    </template>
    <!-- :class="[playerResponse.scavResponses[index].answer.trim() ? 'bg-green-500' : 'bg-red-400']" -->
  </div>
</template>

<script>
// import Scav from "@/components/Scav";
export default {
  name: "PlayScavs",
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
    scavs() {
      return this.$store.getters.scavs;
    },
    answers() {
      console.log("A", this.$store.getters.currentScavAnswers);
      // console.log("H:", this.$store.getters.currentHunt);
      return this.$store.getters.currentScavAnswers;
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
    scavStatus(index) {
      let status;
      console.log("index:", index);
      console.log(this.scavs.length, this.playerResponse.scavResponses.length);
      // if ((this.playerResponse.scavResponses.length = this.scavs.length)) {
      //   status = this.playerResponse.scavResponses[index].answer.trim();
      // } else {
      //   status = false;
      // }
      return ["bg-red-400"];
    },
    scavClicked(scav, index) {
      this.index = index;
      this.number = scav.number;
      this.question = scav.question;
      this.answer = this.playerResponse.scavResponses[index].response;
      this.modal = !this.modal;
    },
    saveAnswer(index, status) {
      console.log("saveAnswer:", index, status);
      this.playerResponse.scavResponses[index].response = status;
      // this.$store.dispatch("updateAnswers");
      this.$store.dispatch("updatePlayerResponse");
      this.modal = !this.modal;
    }
  },
  components: {
    // Scav
  }
};
</script>
