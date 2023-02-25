import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chat-app-28d7b.firebaseapp.com",
  projectId: "chat-app-28d7b",
  storageBucket: "chat-app-28d7b.appspot.com",
  messagingSenderId: "227634552926",
  appId: "1:227634552926:web:ff392500d3af3fa41a94cf",
  measurementId: "G-715BKZ2G5G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
