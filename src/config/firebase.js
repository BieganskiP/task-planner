import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxINDup8DhVk9tkCIR0QTb78cRY-RIj8A",
  authDomain: "task-planner-651c7.firebaseapp.com",
  projectId: "task-planner-651c7",
  storageBucket: "task-planner-651c7.appspot.com",
  messagingSenderId: "730169691536",
  appId: "1:730169691536:web:66eba93eef97eeeb1f7715",
  measurementId: "G-ZLRN59GWD4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
