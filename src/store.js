import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import { auth, db } from "./firebaseConfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: null,
    currentAnswers: [],
    isAuthenticated: false,
    userProfile: {},
    userAnswers: [],
    isMaster: false,
    isCaptain: false,
    isPlayer: false,
    hunts: [],
    currentHunt: null
  },
  mutations: {
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
    setUserAnswers(state, value) {
      // eslint-disable-next-line
      console.log("setUserAnswers: ", value);
      state.userAnswers = value;
    },
    setCurrentAnswers(state, value) {
      // eslint-disable-next-line
      console.log("setCurrentAnswers: ", value);
      state.currentAnswers = value;
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
      // eslint-disable-next-line
      console.log("Updating hunt to array...not implementated", state, value);
      // const hunt = state.hunts.find(hunt => {
      //   return hunt.id === value.id;
      // })
      // hunt = value;
    }
  },
  actions: {
    userSignUp({ dispatch, commit }, { name, email, password }) {
      // eslint-disable-next-line
      console.log("actions:userSignUp");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          commit("setCurrentUser", cred.user);
          db.collection("users")
            .doc(cred.user.uid)
            .set({
              name: name,
              hunts: []
            })
            .then(() => {
              dispatch("getUserProfile");
              router.push("/");
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log("Error getting user's profile", err);
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
      auth.signInWithEmailAndPassword(email, password).then(cred => {
        commit("setCurrentUser", cred.user);
        dispatch("getUserProfile");
        //dispatch("getUserAnswers");
        commit("setIsAuthenticated", true);
        router.push("/");
        // eslint-disable-next-line
        console.log("Signed in:", cred.user, cred.user.email);
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
    getUserProfile({ dispatch, commit, state }) {
      // eslint-disable-next-line
      console.log("Getting User Profile...");
      db.collection("users")
        .doc(state.currentUser.uid)
        .get()
        .then(doc => {
          commit("setUserProfile", doc.data());
          // eslint-disable-next-line
          console.log("Setting user profile", doc.data());
          dispatch("getUserAnswers");
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log("Error getting User Profile", err);
        });
    },
    getUserAnswers({ commit, state }) {
      // eslint-disable-next-line
      console.log("state:", state);
      // console.log(
      //   "Getting User Answers...",
      //   state.currentUser.uid,
      //   state.currentHunt.id
      // );
      commit("setLoading", true);
      db.collection("users")
        .doc(state.currentUser.uid)
        .collection("hunts")
        .get()
        .then(snapshot => {
          const answers = [];
          let answer = {};
          snapshot.forEach(doc => {
            // eslint-disable-next-line
            console.log("doc, doc.data() in hunts(answers):", doc, doc.data());
            // eslint-disable-next-line
            console.log("currentHunt", state.currentHunt);
            answer = doc.data();
            answer["id"] = doc.id;
            // eslint-disable-next-line
            console.log("Answer in getUserAnswers = ", answer);
            answers.push(answer);
            // eslint-disable-next-line
            console.log("Answers for setUserAnswers = ", answers);
          });

          commit("setUserAnswers", answers);
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("Setting user answers", answers);
        })
        .catch(err => {
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("Error getting user answers: ", err);
        });
    },
    checkUserProfile({ commit, state }) {
      let index = state.userProfile.hunts.indexOf(state.currentHunt.id);
      let hunts = state.userProfile.hunts;
      let answers;
      if (index !== -1) {
        answers = state.userProfile.hunts[index];
        commit("setUserAnswers", answers);
        // eslint-disable-next-line
        console.log(
          "checkUserProfile:",
          index,
          state.userProfile.hunts.indexOf(state.currentHunt.id)
        );
      } else {
        hunts.push(state.currentHunt.id);
        // eslint-disable-next-line
        console.log(
          "checkUserProfile:",
          state.currentUser,
          state.userProfile,
          state.currentHunt
        );
        db.collection("users")
          .doc(state.currentUser.uid)
          .set({
            hunts: hunts
          });
      }
      // db.collection("users")
      //   .doc(state.currentUser.uid)
      //   .get()
      //   .then(doc => {
      //     commit("setUserProfile", doc.data());
      //     // eslint-disable-next-line
      //     console.log("Setting user profile", doc.data());
      //   })
      //   .catch(err => {
      //     // eslint-disable-next-line
      //     console.log("Error getting user profile", err);
      //   });
    },
    addHunt({ commit }, { title, description }) {
      // eslint-disable-next-line
      console.log("actions:addHunt", title, description);
      let hunt = {
        title: title,
        description: description,
        clues: [
          { question: "First Clue", answer: "First Answer" },
          { question: "Second Clue", answer: "Second Answer" }
        ],
        scavs: [{ scav: "First Scavenge" }],
        date: null,
        notes: ""
      };
      db.collection("hunts")
        .add(hunt)
        .then(docRef => {
          commit("addHunt", hunt);
          router.push("/");
          // eslint-disable-next-line
          console.log("Hunt added with ref:", docRef, docRef.id);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Error adding hunt", error);
        });
    },
    getHunts({ commit }) {
      // eslint-disable-next-line
      console.log("Getting hunts...");
      commit("setLoading", true);
      db.collection("hunts")
        .get()
        .then(snapshot => {
          const hunts = [];
          let hunt = {};
          snapshot.forEach(doc => {
            // eslint-disable-next-line
            console.log("doc, doc.data() in hunts:", doc, doc.data());
            hunt = doc.data();
            hunt["id"] = doc.id;
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

    updateHunt({ commit }, hunt) {
      // eslint-disable-next-line
      console.log("actions:updateHunt", hunt);
      commit("setLoading", true);
      db.collection("hunts")
        .doc(hunt.id)
        .update(hunt)
        .then(() => {
          commit("setLoading", false);
          // eslint-disable-next-line
          console.log("committing updateHunt");
          commit("updateHunt", hunt);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log("Error updating hunt", error);
          commit("setLoading", false);
        });
    },
    setCurrentHunt({ commit, dispatch, state }, index) {
      // eslint-disable-next-line
      console.log("in setCurrentHunt", index);
      commit("setCurrentHunt", index);
      //dispatch("checkUserProfile");
    },
    setCurrentAnswers({ commit, dispatch, state }, index) {
      console.log(
        "in setCurrentAnswers",
        state.currentHunt.id,
        state.userAnswers
      );
      let currentHuntId = state.currentHunt.id;
      let userAnswers = state.userAnswers;
      const answers = userAnswers.filter(answer => {
        console.log(answer.id, currentHuntId);
        if (answer.id == currentHuntId) {
          console.log("equal");
        }
        return answer.id == currentHuntId;
      });
      console.log("answers =", answers[0]["answers"]);
      // eslint-disable-next-line

      commit("setCurrentAnswers", answers[0]["answers"]);
      // dispatch("checkUserProfile");
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
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
      return state.currentHunt.clues;
    },
    currentAnswers(state) {
      return state.currentAnswers; // answers
    }
  }
});
