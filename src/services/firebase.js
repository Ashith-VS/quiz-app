import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGVVSPIBa-OY_eDAa_vU0yAX7ffsZqkpw",
  authDomain: "todolist-e8c13.firebaseapp.com",
  projectId: "todolist-e8c13",
  storageBucket: "todolist-e8c13.appspot.com",
  messagingSenderId: "1097068272002",
  appId: "1:1097068272002:web:d633d1adfaaa492697979b",
  measurementId: "G-PGJFZZ9SL7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
