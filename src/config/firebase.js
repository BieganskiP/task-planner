import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxINDup8DhVk9tkCIR0QTb78cRY-RIj8A",
  authDomain: "task-planner-651c7.firebaseapp.com",
  projectId: "task-planner-651c7",
  storageBucket: "task-planner-651c7.appspot.com",
  messagingSenderId: "730169691536",
  appId: "1:730169691536:web:f64efee61b44495f1f7715",
  measurementId: "G-9L4PXQFHYD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
