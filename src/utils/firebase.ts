// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB3xp4lPFIaXQb_NizZi7que7816nvKJG0",
  authDomain: "vue-firebase-d9dd2.firebaseapp.com",
  projectId: "vue-firebase-d9dd2",
  storageBucket: "vue-firebase-d9dd2.firebasestorage.app",
  messagingSenderId: "256301916073",
  appId: "1:256301916073:web:1dd36dc357d887a5f62eb8"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };