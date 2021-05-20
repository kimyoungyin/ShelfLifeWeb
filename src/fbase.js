// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyCNgBKsUfQwcUd-2VPO8ZnsYDLjz4UQFnU",
  authDomain: "please-1241b.firebaseapp.com",
  databaseURL: "https://please-1241b-default-rtdb.firebaseio.com",
  projectId: "please-1241b",
  storageBucket: "please-1241b.appspot.com",
  messagingSenderId: "774284261383",
  appId: "1:774284261383:web:3b98bfcd5134807089d2a2",
  measurementId: "G-SNFW6F86L0",
};
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const analytics = firebase.analytics();
