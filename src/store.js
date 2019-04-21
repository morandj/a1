import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import { auth, db } from "./firebaseConfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: null,
    currentAnswers: {},
    isAuthenticated: false,
    userProfile: {},
    userAnswers: null,
    isMaster: true,
    isCaptain: false,
    isPlayer: true,
    hunts: [],
    currentHunt: null
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
    setUserAnswers(state, value) {
      // eslint-disable-next-line
      console.log("setUserAnswers: ", value);
      state.userAnswers.answers = value;
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
        clues: [
          // { question: "First Clue", answer: "First Answer" },
          // { question: "Second Clue", answer: "Second Answer" }
        ],
        scavs: [{ scav: "First Scavenge" }],
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
        state.currentAnswers
      );
      let answers = state.currentAnswers;
      // eslint-disable-next-line
      console.log(answers.length > 0 ? "ok" : "not ok");
      // console.log("?", hunt == state.currentHunt);
      let huntId = state.currentHunt.huntId;
      let huntDoc = state.currentHunt.huntData;
      let userId = state.currentUser.uid;
      commit("setLoading", true);
      db.collection("hunts")
        .doc(huntId)
        .update(huntDoc)
        .then(() => {
          // eslint-disable-next-line
          console.log(">>>>", state.hunts, state.hunts[1].huntData.title);
          dispatch("updateAnswers");
          // eslint-disable-next-line
          console.log("Back from updateAnswers");

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

    updateAnswers({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateAnswers",
        state.currentHunt,
        state.currentUser,
        state.currentAnswers
      );
      let answers = state.currentAnswers;
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
    // Get the selected hunt and then get the user's answers for that hunt.
    getCurrentHunt({ commit, dispatch, state }, index) {
      // eslint-disable-next-line
      console.log("(2)...in getCurrentHunt", index);
      commit("setCurrentHunt", index);
      //dispatch("checkUserProfile");
      return dispatch("getCurrentAnswers", index).then(() => {
        console.log("Answers got", state.currentAnswers);
      });
    },
    getCurrentAnswers({ commit, state }, index) {
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
      let answers; //answers
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
            answers = doc.data();
            // eslint-disable-next-line
            console.log(
              "(4)...Player's answers exist, doc.data:",
              doc.data(),
              "answers:",
              answers,
              "answers.answers:",
              answers.answers
            );
            return answers.answers;
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
            answers = [];
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
          commit("setCurrentAnswers", answers);
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
    currentAnswers(state) {
      return state.currentAnswers; // answers
    }
  }
});
