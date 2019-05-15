import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import { auth, db } from "./firebaseConfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    masterSolution: {
      clueAnswers: [],
      scavAnswers: []
    },
    playerResponse: {
      clueResponses: [],
      scavResponses: []
    },
    currentUser: null,
    currentClueAnswers: {},
    curentScavAnswers: {},
    currentScavs: {},
    currentScavStatuses: {},
    currentLimerick: {},
    currentTeam: {},
    currentHunt: null,
    isAuthenticated: false,
    isMaster: true,
    isCaptain: false,
    isPlayer: false,
    userProfile: {},
    userAnswers: null,
    userScavs: null,
    userLimerick: null,
    hunts: [],
    aaatest: []
  },
  mutations: {
    // for dev only
    setMasterAndPlayer(state) {
      if (state.isMaster) {
        state.isMaster = false;
        state.isPlayer = true;
      } else {
        state.isMaster = true;
        state.isPlayer = false;
      }
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setCurrentUser(state, value) {
      state.currentUser = value;
      // eslint-disable-next-line
      console.log("setCurrentUser:", state.currentUser);
    },
    setIsAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    setUserProfile(state, value) {
      state.userProfile = value;
    },
    setMasterSolution(state, value) {
      if ("clueAnswers" in value === true) {
        state.masterSolution.clueAnswers = value.clueAnswers;
      } else {
        state.masterSolution.clueAnswers = [];
      }
      if ("scavAnswers" in value === true) {
        state.masterSolution.scavAnswers = value.scavAnswers;
      } else {
        state.masterSolution.scavAnswers = [];
      }
    },
    setPlayerResponse(state, value) {
      if ("clueResponses" in value === true) {
        state.playerResponse.clueResponses = value.clueResponses;
      } else {
        state.playerResponse.clueResponses = [];
      }
      if ("scavResponses" in value === true) {
        state.playerResponse.scavResponses = value.scavResponses;
      } else {
        state.playerResponse.scavResponses = [];
      }
    },
    setUserAnswers(state, value) {
      // eslint-disable-next-line
      console.log("setUserAnswers: ", value);
      state.userAnswers.answers = value;
    },
    setCurrentClueAnswers(state, value) {
      // eslint-disable-next-line
      console.log("setCurrentClueAnswers: ", value);
      state.currentClueAnswers = value;
    },
    setHunts(state, value) {
      // eslint-disable-next-line
      console.log("setHunts: ", value);
      state.hunts = value;
    },
    setCurrentHunt(state, value) {
      // eslint-disable-next-line
      console.log("currentHunt before:", state.currentHunt);
      state.currentHunt = state.hunts[value];
      // eslint-disable-next-line
      console.log("currentHunt after:", state.currentHunt);
    },
    addHunt(state, value) {
      // eslint-disable-next-line
      console.log("Adding hunt to array");
      state.hunts.push(value);
    },
    updateHunt(state, value) {
      // ? maybe set update status for hunt, i.e. changes made but not yet saved to db?
      // eslint-disable-next-line
      console.log(
        "currentHunt references object in 'hunts array",
        state,
        value
      );
    }
  },
  actions: {
    toggleMasterPlayer({ commit }) {
      commit("setMasterAndPlayer");
    },
    userSignUp({ dispatch, commit }, { name, email, password }) {
      // eslint-disable-next-line
      console.log("actions:userSignUp");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          commit("setCurrentUser", cred.user); //uid
          commit("setIsAuthenticated", true);
          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              name: name,
              team: ""
            })
            .then(() => {
              dispatch("getUserProfile");
              router.push("/");
            });
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log("Sign Up error", err);
        });
    },
    userSignIn({ dispatch, commit }, { email, password }) {
      // eslint-disable-next-line
      console.log("actions:userSignIn");
      auth
        .signInWithEmailAndPassword(email, password)
        .then(cred => {
          commit("setCurrentUser", cred.user); //uid
          commit("setIsAuthenticated", true);
          dispatch("getUserProfile");
          router.push("/");
          // eslint-disable-next-line
          console.log("Signed in:", cred.user, cred.user.email);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log("Sign In error", err);
        });
    },
    userSignOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit("setCurrentUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Signed out:");
        })
        .catch(() => {
          commit("setCurrentUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Error Signing out:");
        });
    },
    getUserProfile({ commit, state }) {
      // get user profile from 'users' db and set state
      // eslint-disable-next-line
      console.log("Getting User Profile...");
      db.collection("users")
        .doc(state.currentUser.uid)
        .get()
        .then(doc => {
          commit("setUserProfile", doc.data());
          // eslint-disable-next-line
          console.log("Setting user profile", doc.data());
          //dispatch("getUserAnswers");
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log("Error getting User Profile", err);
        });
    },

    addHunt({ commit }, { title, description }) {
      // eslint-disable-next-line
      console.log("actions:addHunt", title, description);
      let hunt = {
        id: null,
        title: title,
        description: description,
        rules: null,
        map: null,
        clues: [
          // { question: "First Clue", answer: "First Answer" },
          // { question: "Second Clue", answer: "Second Answer" }
        ],
        scavs: [],
        limerick: null,
        date: null,
        notes: ""
      };
      db.collection("hunts")
        .add(hunt)
        .then(docRef => {
          // eslint-disable-next-line
          console.log("addHunt document reference:", docRef);
          let newHunt = {
            huntId: docRef.id,
            huntData: hunt
          };
          commit("addHunt", newHunt);
          router.push("/");
          // eslint-disable-next-line
          console.log("Hunt added with ref:", newHunt);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Error adding hunt", error);
        });
    },
    addSolutions() {},

    getHunts({ commit }) {
      // eslint-disable-next-line
      console.log("Getting hunts...");
      commit("setLoading", true);
      db.collection("hunts")
        .get()
        .then(snapshot => {
          const hunts = [];
          snapshot.forEach(doc => {
            let hunt = {
              huntId: null,
              huntData: {}
            };
            // eslint-disable-next-line
            console.log("doc, doc.data() in hunts:", doc, doc.data());
            // hunt["id"] = doc.id;
            hunt.huntId = doc.id;
            //hunt = doc.data();
            hunt.huntData = doc.data();
            // hunt["date"] = doc.data().date.toDate();
            // hunts.push(doc.data());
            // eslint-disable-next-line
            console.log("Hunt in getHunts = ", hunt);
            hunts.push(hunt);
          });
          commit("setHunts", hunts);
          commit("setLoading", false);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
          commit("setLoading", false);
        });
    },

    updateHunt({ commit, dispatch, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateHunt",
        state.currentHunt,
        state.currentUser,
        state.currentClueAnswers
      );
      //let answers = state.currentClueAnswers;
      // eslint-disable-next-line
      // console.log("HERE");
      // console.log("answers:", answers);
      // console.log(answers.length > 0 ? "ok" : "not ok");
      // console.log("?", hunt == state.currentHunt);
      let huntId = state.currentHunt.huntId;
      let huntDoc = state.currentHunt.huntData;
      // let userId = state.currentUser.uid;
      commit("setLoading", true);
      db.collection("hunts")
        .doc(huntId)
        .update(huntDoc)
        .then(() => {
          // eslint-disable-next-line
          console.log(">>>>", state.hunts, state.hunts[1].huntData.title);
          //          dispatch("updateSolutions");
          dispatch("updateMasterClueAnswers");
          // dispatch("updateMasterScavAnswers");
          // eslint-disable-next-line
          console.log("Back from updateSolutions");

          // if (answers.length > 0) {
          //   let ans = { answers };
          //   db.collection("hunts")
          //     .doc(huntId)
          //     .collection("players")
          //     .doc(userId)
          //     .set(ans)
          //     .then(() => {});
          // } else {
          //   // eslint-disable-next-line
          //   console.log("no answers yet...", answers);
          // }
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("committing updateHunt");
          commit("updateHunt", huntDoc);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Error updating hunt", error);
          commit("setLoading", false);
        });
    },
    updateSolutions({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateSolutions",
        state.currentHunt,
        state.currentUser,
        state.currentClueAnswers
      );
      let clueAnswers = state.currentClueAnswers;
      // eslint-disable-next-line
      console.log(clueAnswers.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      // let userId = state.currentUser.uid;

      if (clueAnswers.length > 0) {
        //let ans = { clueAnswers };
        commit("setLoading", true);
        return db
          .collection("hunts")
          .doc(huntId)
          .collection("solutions")
          .doc("solution")
          .set({ clueAnswers }, { merge: true })
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no answers yet...", clueAnswers);
        commit("setLoading", false);
        return [];
      }
    },
    updateMasterClueAnswers({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateMasterClueAnswers",
        state.currentHunt,
        state.currentUser,
        state.masterSolution.clueAnswers,
        state.currentClueAnswers
      );
      let clueAnswers = state.masterSolution.clueAnswers;
      // eslint-disable-next-line
      console.log(clueAnswers.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      // let userId = state.currentUser.uid;

      if (clueAnswers.length > 0) {
        //let ans = { clueAnswers };
        commit("setLoading", true);
        return db
          .collection("hunts")
          .doc(huntId)
          .collection("solutions")
          .doc("solution")
          .set({ clueAnswers }, { merge: true })
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no clue answers yet...", clueAnswers);
        commit("setLoading", false);
        return [];
      }
    },
    updateMasterScavAnswers({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateMasterScavAnswers",
        state.currentHunt,
        state.currentUser,
        state.currentScavAnswers
      );
      let scavAnswers = state.currentScavAnswers;
      // eslint-disable-next-line
      console.log(scavAnswers.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      // let userId = state.currentUser.uid;

      if (scavAnswers.length > 0) {
        //let ans = { scavAnswers };
        commit("setLoading", true);
        return db
          .collection("hunts")
          .doc(huntId)
          .collection("solutions")
          .doc("solution")
          .set({ scavAnswers }, { merge: true })
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no scav answers yet...", scavAnswers);
        commit("setLoading", false);
        return [];
      }
    },
    updatePlayerResponse({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updatePlayerResponse",
        state.currentHunt,
        state.currentUser,
        state.playerResponse,
        state.currentClueAnswers
      );
      let playerResponse = state.playerResponse;
      // eslint-disable-next-line
      // console.log(response.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      let userId = state.currentUser.uid;

      if (playerResponse) {
        // let ans = { answers };
        commit("setLoading", true);
        return db
          .collection("hunts")
          .doc(huntId)
          .collection("players")
          .doc(userId)
          .set({ playerResponse }, { merge: true })
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no response yet...", playerResponse);
        commit("setLoading", false);
        return [];
      }
    },

    updateAnswers({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateAnswers",
        state.currentHunt,
        state.currentUser,
        state.currentClueAnswers
      );
      let answers = state.currentClueAnswers;
      // eslint-disable-next-line
      console.log(answers.length > 0 ? "ok" : "not ok");
      let huntId = state.currentHunt.huntId;
      // let huntDoc = state.currentHunt.huntData;
      let userId = state.currentUser.uid;

      if (answers.length > 0) {
        let ans = { answers };
        commit("setLoading", true);
        return db
          .collection("hunts")
          .doc(huntId)
          .collection("players")
          .doc(userId)
          .set(ans)
          .then(() => {
            commit("setLoading", false);
          });
      } else {
        // eslint-disable-next-line
        console.log("no answers yet...", answers);
        commit("setLoading", false);
        return [];
      }
    },
    // Get the selected hunt and then get the MASTER solution for that hunt.
    editCurrentHunt({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("(2)...in editCurrentHunt", obj.index, obj.mode);
      commit("setCurrentHunt", obj.index);
      //dispatch("checkUserProfile");

      return dispatch("getMasterSolution", obj.index).then(() => {
        // eslint-disable-next-line
        console.log("Solutions got", state.masterSolution);
      });
    },
    getMasterSolution({ commit, state }) {
      // eslint-disable-next-line
      console.log("(3)...state:", state);
      // eslint-disable-next-line
      console.log(
        "(3a)...Getting Master Solution...",

        state.currentHunt.huntId
      );
      commit("setLoading", true);

      let huntId = state.currentHunt.huntId;
      // let answers; //answers
      let docRef = db
        .collection("hunts")
        .doc(huntId)
        .collection("solutions")
        .doc("solution");
      // eslint-disable-next-line
      console.log("(3b)...About to get master solution...");
      return docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let docData = doc.data();
            // eslint-disable-next-line
            console.log(
              "(4)...Masters' solution exists, doc.data:",
              doc.data(),
              "docData:",
              docData,
              "docData.solution:",
              docData.solution
            );
            // eslint-disable-next-line
            console.log("...in getCurrentSolutions", docData.clueAnswers);
            //return docData.answers;
            // return docData.clueAnswers;
            return docData;
          } else {
            // eslint-disable-next-line
            console.log(
              "(4a)...Master has no solutions",
              state.currentHunt.id,
              huntId,
              state.currentHunt.huntData.clues.length
            );
            return { clueAnswers: [], scavAnswers: [] }; // check if just {} works on new hunt - setMasterSolution was making objects?
          }
        })
        .then(solution => {
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("(5)...solution =", solution);
          commit("setMasterSolution", solution);
          // router.push({ name: "edithunt", params: { index } });
        })
        .catch(err => {
          commit("setLoading", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Error getting master solution", err);
        });
    },

    // Get the selected hunt and then get the PLAYER response for that hunt.
    playCurrentHunt({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("(2)...in  playCurrentHunt", obj.index, obj.mode);
      commit("setCurrentHunt", obj.index);
      //dispatch("checkUserProfile");

      return dispatch("getPlayerResponse", obj.index).then(() => {
        // eslint-disable-next-line
        console.log("Response got", state.playerResponse);
      });
    },

    getPlayerResponse({ commit, state }) {
      // eslint-disable-next-line
      console.log("(3)...state:", state);
      // eslint-disable-next-line
      console.log(
        "(3a)...Getting Player Response...",
        state.currentUser.uid,
        state.currentHunt.huntId
      );
      commit("setLoading", true);
      let userId = state.currentUser.uid;
      let huntId = state.currentHunt.huntId;
      // let answers; //answers
      let docRef = db
        .collection("hunts")
        .doc(huntId)
        .collection("players")
        .doc(userId);
      // eslint-disable-next-line
      console.log("(3b)...About to get player response...");
      return docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let docData = doc.data();
            // eslint-disable-next-line
            console.log(
              "(4)...Players' response exists, doc.data:",
              doc.data(),
              "docData:",
              docData,
              "docData.userId:",
              docData.userId
            );
            // eslint-disable-next-line
            console.log("...in getPlayerResponse", docData.userId);
            //return docData.answers;
            // return docData.clueAnswers;
            return docData.playerResponse;
          } else {
            // eslint-disable-next-line
            console.log(
              "(4a)...Player has no response",
              state.currentHunt.id,
              huntId,
              state.currentHunt.huntData.clues.length
            );

            let len;

            len = state.currentHunt.huntData.clues.length;
            let resClues = [];
            for (let i = 0; i < len; i++) {
              let num = i + 1;
              let obj = { number: num, response: "" };
              resClues.push(obj);
            }

            len = state.currentHunt.huntData.scavs.length;
            let resScavs = [];
            for (let i = 0; i < len; i++) {
              console.log("in resScav");
              let num = i + 1;
              let obj = { number: num, response: "" };
              resScavs.push(obj);
            }
            return { clueResponses: resClues, scavResponses: resScavs };
          }
        })
        .then(response => {
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("(5)...response =", response);
          commit("setPlayerResponse", response);
          // router.push({ name: "edithunt", params: { index } });
        })
        .catch(err => {
          commit("setLoading", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Error getting player response", err);
        });
    },

    // Get the selected hunt and then get the user's answers for that hunt.
    getCurrentHunt({ commit, dispatch, state }, obj) {
      // eslint-disable-next-line
      console.log("(2)...in getCurrentHunt", obj.index, obj.mode);
      commit("setCurrentHunt", obj.index);
      //dispatch("checkUserProfile");
      if (obj.mode == "play") {
        return dispatch("getCurrentClueAnswers", obj.index).then(() => {
          // eslint-disable-next-line
          console.log("Answers got", state.currentClueAnswers);
        });
      } else {
        return dispatch("getCurrentSolutions", obj.index).then(() => {
          // eslint-disable-next-line
          console.log("Solutions got", state.currentClueAnswers);
        });
      }
    },

    getCurrentSolutions({ commit, state }) {
      // eslint-disable-next-line
      console.log("(3)...state:", state);
      // eslint-disable-next-line
      console.log(
        "(3a)...Getting Current Solutions...",

        state.currentHunt.huntId
      );
      commit("setLoading", true);

      let huntId = state.currentHunt.huntId;
      // let answers; //answers
      let docRef = db
        .collection("hunts")
        .doc(huntId)
        .collection("solutions")
        .doc("solution");
      // eslint-disable-next-line
      console.log("(3b)...About to get solutions...");
      return docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let docData = doc.data();
            // eslint-disable-next-line
            console.log(
              "(4)...Masters' solutions exist, doc.data:",
              doc.data(),
              "docData:",
              docData,
              "docData.solution:",
              docData.solution
            );
            // eslint-disable-next-line
            console.log("...in getCurrentSolutions", docData.clueAnswers);
            //return docData.answers;
            // return docData.clueAnswers;
            return docData;
          } else {
            // eslint-disable-next-line
            console.log(
              "(4a)...Master has no solutions",
              state.currentHunt.id,
              huntId,
              state.currentHunt.huntData.clues.length
            );
            let answers = [];
            let len = state.currentHunt.huntData.clues.length;
            for (let i = 0; i < len; i++) {
              let num = i + 1;
              let obj = { answer: "", number: num };
              answers.push(obj);
            }
            // for (new Array(state.currentHunt.huntData.clues.length).fill(
            //   0
            // );
            console.log("ans?", { answers });
            return { answers: answers };
          }
        })
        .then(answers => {
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("(5)...answers =", answers);
          commit("setCurrentClueAnswers", answers.clueAnswers);
          // router.push({ name: "edithunt", params: { index } });
        })
        .catch(err => {
          commit("setLoading", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Error getting user answers", err);
        });
    },

    getCurrentClueAnswers({ commit, state }) {
      // eslint-disable-next-line
      console.log("(3)...state:", state);
      // eslint-disable-next-line
      console.log(
        "(3a)...Getting Current Answers...",
        state.currentUser.uid,
        state.currentHunt.huntId
      );
      commit("setLoading", true);
      let userId = state.currentUser.uid;
      let huntId = state.currentHunt.huntId;
      // let answers; //answers
      let docRef = db
        .collection("hunts")
        .doc(huntId)
        .collection("players")
        .doc(userId);
      // eslint-disable-next-line
      console.log("(3b)...About to get answers...");
      return docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let docData = doc.data();
            // eslint-disable-next-line
            console.log(
              "(4)...Player's answers exist, doc.data:",
              doc.data(),
              "docData:",
              docData,
              "docData.answers:",
              docData.answers
            );
            return docData.answers;
          } else {
            // eslint-disable-next-line
            console.log(
              "(4a)...Player has no answers",
              state.currentHunt.id,
              huntId,
              state.currentUser.uid,
              userId,
              state.currentHunt.huntData.clues.length
            );
            let answers = [];
            let len = state.currentHunt.huntData.clues.length;
            for (let i = 0; i < len; i++) {
              let num = i + 1;
              let obj = { answer: "", number: num };
              answers.push(obj);
            }
            // for (new Array(state.currentHunt.huntData.clues.length).fill(
            //   0
            // );
            return answers;
          }
        })
        .then(answers => {
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("(5)...answers =", answers);
          commit("setCurrentClueAnswers", answers);
          // router.push({ name: "edithunt", params: { index } });
        })
        .catch(err => {
          commit("setLoading", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Error getting user answers", err);
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isMaster(state) {
      return state.isMaster;
    },
    isPlayer(state) {
      return state.isPlayer;
    },
    loading(state) {
      return state.loading;
    },
    hunts(state) {
      return state.hunts;
      // return state.hunts.sort((huntA, huntB) => {
      //   return huntA.date > huntB.date;
      // });
    },
    hunt: state => idx => {
      return state.hunts[idx];
    },
    currentHunt(state) {
      return state.currentHunt;
    },
    clues(state) {
      return state.currentHunt.huntData.clues;
    },
    currentClueAnswers(state) {
      return state.currentClueAnswers; // answers
    },
    scavs(state) {
      return state.currentHunt.huntData.scavs;
    },
    masterSolution(state) {
      return state.masterSolution;
    },
    masterClueAnswers: state => {
      return state.masterSolution.clueAnswers;
    },
    playerResponse(state) {
      return state.playerResponse;
    }
  }
});
