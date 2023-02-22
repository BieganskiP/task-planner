// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxINDup8DhVk9tkCIR0QTb78cRY-RIj8A",
  authDomain: "task-planner-651c7.firebaseapp.com",
  projectId: "task-planner-651c7",
  storageBucket: "task-planner-651c7.appspot.com",
  messagingSenderId: "730169691536",
  appId: "1:730169691536:web:6ea8202a546c190e1f7715",
  measurementId: "G-FZGH64966C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
