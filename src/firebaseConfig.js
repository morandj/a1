import firebase from "firebase";
//import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyBr1PnDv8q091SQEmIU62j_izq1bWpOo_s",
  authDomain: "vue-app-5d6dd.firebaseapp.com",
  databaseURL: "https://vue-app-5d6dd.firebaseio.com",
  projectId: "vue-app-5d6dd",
  storageBucket: "vue-app-5d6dd.appspot.com",
  messagingSenderId: "109417216194"
};
firebase.initializeApp(config);

// firebase utils
const auth = firebase.auth();
const db = firebase.firestore();

//const currentUser = auth.currentUser;

// date issue fix according to firebase
// const settings = {
//   timestampsInSnapshots: true
// };
// db.settings(settings);

// firebase collections
// const usersCollection = db.collection("users");
// const huntsCollection = db.collection("hunts");
// const postsCollection = db.collection("posts");
// const commentsCollection = db.collection("comments");
// const likesCollection = db.collection("likes");

export {
  auth,
  db

  // currentUser,
  // usersCollection,
  // huntsCollection
  // postsCollection,
  // commentsCollection,
  // likesCollection
};
