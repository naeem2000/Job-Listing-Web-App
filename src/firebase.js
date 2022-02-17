import app from "firebase/app";
import "firebase/firestore";

// Firebase API
const firebaseConfig = {
  apiKey: "AIzaSyBTESRCFnvnuqiq8w8RCnW7UqJJHMZUT-w",
  authDomain: "job-listing-39b59.firebaseapp.com",
  projectId: "job-listing-39b59",
  storageBucket: "job-listing-39b59.appspot.com",
  messagingSenderId: "977826862837",
  appId: "1:977826862837:web:514ed32919af9f6586d7bc",
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };
