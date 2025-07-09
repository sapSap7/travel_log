// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFwTee8GbcextSCYUhlYdLjkp7Nx9m9FU",
  authDomain: "travellog-fa617.firebaseapp.com",
  projectId: "travellog-fa617",
  storageBucket: "travellog-fa617.appspot.com",
  messagingSenderId: "854460206177",
  appId: "1:854460206177:web:0926c798f8ad22d897ee20",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
