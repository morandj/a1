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
      state.currentHunt = value;
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
      console.log(
        "currentHunt references object in 'hunts array",
        state,
        value
      );
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
          commit("setCurrentUser", cred.user); //uid
          commit("setIsAuthenticated", true);
          db.collection("users")
            .doc(cred.user.uid)
            .set({
              name: name,
              team: ""
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
        commit("setCurrentUser", cred.user); //uid
        commit("setIsAuthenticated", true);
        dispatch("getUserProfile");
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
    // getUserAnswers({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     // eslint-disable-next-line
    //     console.log("state:", state);
    //     // eslint-disable-next-line
    //     console.log(
    //       "Getting User Answers...",
    //       state.currentUser.uid,
    //       state.currentHunt.id
    //     );
    //     commit("setLoading", true);
    //     let docRef = db
    //       .collection("hunts")
    //       .doc(state.currentHunt.id)
    //       .collection("players")
    //       .doc(state.currentUser.uid);
    //     docRef
    //       .get()
    //       .then(doc => {
    //         if (doc.exists) {
    //           // eslint-disable-next-line
    //           console.log("Player's answers exist", doc.data());
    //         } else {
    //           // eslint-disable-next-line
    //           console.log(
    //             "Player's has no answers",
    //             state.currentHunt.id,
    //             state.currentUser.uid
    //           );
    //         }
    //       })
    //       .catch(err => {
    //         // eslint-disable-next-line
    //         console.log("Error getting user answers", err);
    //       });
    //     db.collection("hunts")
    //       .doc(state.currentUser.uid)
    //       .collection("players")
    //       .get()
    //       .then(snapshot => {
    //         if (snapshot) {
    //           console.log("no entry");
    //         } else {
    //           console.log("entry found");
    //         }
    //         let answers = [];
    //         let answer = {};
    //         // console.log("snapshot:", snapshot.docs[0].data());
    //         // snapshot.forEach(doc => {
    //         //   // eslint-disable-next-line
    //         //   console.log("doc, doc.data() in hunts(answers):", doc, doc.data());
    //         //   // eslint-disable-next-line
    //         //   console.log("currentHunt", state.currentHunt);
    //         //   answer = doc.data();
    //         //   answer["id"] = doc.id;
    //         //   // eslint-disable-next-line
    //         //   console.log("Answer in getUserAnswers = ", answer);
    //         //   answers.push(answer);
    //         //   // eslint-disable-next-line
    //         //   console.log("Answers for setUserAnswers = ", answers);
    //         // });
    //         //answers = snapshot.docs[0].data();
    //         //commit("setUserAnswers", answers);
    //         commit("setLoading", false);
    //         // eslint-disable-next-line
    //         console.log("Setting user answers", answers);
    //       })
    //       .catch(err => {
    //         commit("setLoading", false);
    //         // eslint-disable-next-line
    //         console.log("Error getting user answers: ", err);
    //       });
    //   });
    // },
    // checkUserProfile({ commit, state }) {
    //   let index = state.userProfile.hunts.indexOf(state.currentHunt.id);
    //   let hunts = state.userProfile.hunts;
    //   let answers;
    //   if (index !== -1) {
    //     answers = state.userProfile.hunts[index];
    //     commit("setUserAnswers", answers);
    //     // eslint-disable-next-line
    //     console.log(
    //       "checkUserProfile:",
    //       index,
    //       state.userProfile.hunts.indexOf(state.currentHunt.id)
    //     );
    //   } else {
    //     hunts.push(state.currentHunt.id);
    //     // eslint-disable-next-line
    //     console.log(
    //       "checkUserProfile:",
    //       state.currentUser,
    //       state.userProfile,
    //       state.currentHunt
    //     );
    //     db.collection("users")
    //       .doc(state.currentUser.uid)
    //       .set({
    //         hunts: hunts
    //       });
    //   }
    //   // db.collection("users")
    //   //   .doc(state.currentUser.uid)
    //   //   .get()
    //   //   .then(doc => {
    //   //     commit("setUserProfile", doc.data());
    //   //     // eslint-disable-next-line
    //   //     console.log("Setting user profile", doc.data());
    //   //   })
    //   //   .catch(err => {
    //   //     // eslint-disable-next-line
    //   //     console.log("Error getting user profile", err);
    //   //   });
    // },
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

    updateHunt({ commit, state }) {
      // eslint-disable-next-line
      console.log(
        "actions:updateHunt",
        state.currentHunt,
        state.currentUser,
        state.currentAnswers
      );
      let answers = state.currentAnswers;
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
          console.log(">>>>", state.hunts, state.hunts[1].huntData.title);
          if (answers.length > 0) {
            let ans = { answers };
            db.collection("hunts")
              .doc(huntId)
              .collection("players")
              .doc(userId)
              .set(ans)
              .then(() => {});
          } else {
            console.log("no answers yet...", answers);
          }
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
    getCurrentHunt({ commit, dispatch, state }, index) {
      // eslint-disable-next-line
      console.log("in setCurrentHunt", index);
      let currentHunt = state.hunts[index];
      commit("setCurrentHunt", currentHunt);
      //dispatch("checkUserProfile");
      dispatch("getCurrentAnswers", index);
    },
    getCurrentAnswers({ commit, state }, index) {
      // eslint-disable-next-line
      console.log("state:", state);
      // eslint-disable-next-line
      console.log(
        "Getting Current Answers...",
        state.currentUser.uid,
        state.currentHunt.huntId
      );
      commit("setLoading", true);
      let userId = state.currentUser.uid;
      let huntId = state.currentHunt.huntId;
      let answers;
      let docRef = db
        .collection("hunts")
        .doc(huntId)
        .collection("players")
        .doc(userId);
      docRef
        .get()
        .then(doc => {
          commit("setLoading", false);
          if (doc.exists) {
            answers = doc.data();
            // eslint-disable-next-line
            console.log(
              "Player's answers exist",
              doc.data(),
              answers,
              answers.answers
            );
            return answers.answers;
          } else {
            // eslint-disable-next-line
            console.log(
              "Player has no answers",
              state.currentHunt.id,
              huntId,
              state.currentUser.uid,
              userId
            );
            answers = [];
            return answers;
          }
        })
        .then(answers => {
          console.log("answers =", answers);
          commit("setCurrentAnswers", answers);
          router.push({ name: "edithunt", params: { index } });
        })
        .catch(err => {
          commit("setLoading", false);
          router.push("/");
          // eslint-disable-next-line
          console.log("Error getting user answers", err);
        });

      // console.log(
      //   "in setCurrentAnswers",
      //   state.currentHunt.id,
      //   state.currentUser.uid,
      //   state.userAnswers
      // );

      // let currentHuntId = state.currentHunt.id;
      // let userAnswers = state.userAnswers;
      // const answers = userAnswers.filter(answer => {
      //   console.log(answer.id, currentHuntId);
      //   if (answer.id == currentHuntId) {
      //     console.log("equal");
      //   }
      //   return answer.id == currentHuntId;
      // });
      // console.log("answer from filter:", answers);
      // // commit("setCurrentAnswers", answers[0]["answers"]);
      // commit("setCurrentAnswers", answers);
      // // dispatch("checkUserProfile");
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
      return state.currentHunt.huntData.clues;
    },
    currentAnswers(state) {
      return state.currentAnswers; // answers
    }
  }
});
