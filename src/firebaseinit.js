import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCp-AC7AUR_O3oakXB6oY2tzzZn1P9tsOI",
  authDomain: "zoreet.firebaseapp.com",
  projectId: "zoreet",
  storageBucket: "zoreet.appspot.com",
  messagingSenderId: "708789503436",
  appId: "1:708789503436:web:d24c065b010276d7308969",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default firebase;
