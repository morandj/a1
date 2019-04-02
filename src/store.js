import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import { auth, db } from "./firebaseConfig";
// import { auth } from "firebase";
// import { firestore } from "firebase";
// const fb = require("./firebaseConfig.js");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    currentUser: null,
    isAuthenticated: false,
    userProfile: {},
    hunts: [],
    currentHunt: null
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setCurrentUser(state, value) {
      state.currentUser = value;
    },
    setIsAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    setUserProfile(state, value) {
      state.userProfile = value;
    },
    setHunts(state, value) {
      console.log("setHunts: ", value);
      state.hunts = value;
    },
    setCurrentHunt(state, value) {
      console.log("currentHunt before:", state.currentHunt);
      state.currentHunt = state.hunts[value];
      console.log("currentHunt after:", state.currentHunt);
    },
    addHunt(state, value) {
      console.log("Adding hunt to array");
      state.hunts.push(value);
    },
    updateHunt(state, value) {
      console.log("Updating hunt to array");
      // const hunt = state.hunts.find(hunt => {
      //   return hunt.id === value.id;
      // })
      // hunt = value;
    }
  },
  actions: {
    userSignIn({ commit }, { email, password }) {
      console.log("actions:userSignIn");
      auth.signInWithEmailAndPassword(email, password).then(user => {
        commit("setCurrentUser", user);
        commit("setIsAuthenticated", true);
        router.push("/");
        console.log("Signed in:", user);
      });
    },
    userSignOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit("setCurrentUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
          console.log("Signed out:");
        })
        .catch(() => {
          commit("setCurrentUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
          console.log("Error Signing out:");
        });
    },
    getUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(doc => {
          commit("setUserProfile", doc.data());
        })
        .catch(err => {
          console.log("Error getting user profile", err);
        });
    },
    addHunt({ commit }, { title, description }) {
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
          console.log("Hunt added with ref:", docRef, docRef.id);
        })
        .catch(error => {
          console.log("Error adding hunt", error);
        });
    },
    updateHunt({ commit }, hunt) {
      console.log("actions:updateHunt", hunt);

      db.collection("hunts")
        .doc(hunt.id)
        .update(hunt)
        .then(() => {
          commit("setLoading", false);
          commit("updateHunt", hunt);
          console.log("committing updateHunt");
        })
        .catch(error => {
          console.log("Error updating hunt", error);
          commit("setLoading", false);
        });
    },
    getHunts({ commit }) {
      console.log("Getting hunts...");
      commit("setLoading", true);
      db.collection("hunts")
        .get()
        .then(snapshot => {
          const hunts = [];
          let hunt = {};
          snapshot.forEach(doc => {
            console.log("doc/doc.data() in hunts:", doc, doc.data());
            hunt = doc.data();
            hunt["id"] = doc.id;
            // hunt["date"] = doc.data().date.toDate();
            // hunts.push(doc.data());
            hunts.push(hunt);
            console.log("Hunt = ", hunt);
          });
          commit("setHunts", hunts);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    setCurrentHunt({ commit }, id) {
      commit("setCurrentHunt", id);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
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
    }
  }
});
