// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqbS3WZFW9ajJaKawI6xD21uLJM6398Aw",
  authDomain: "latihan-48b3a.firebaseapp.com",
  projectId: "latihan-48b3a",
  storageBucket: "latihan-48b3a.firebasestorage.app",
  messagingSenderId: "1051126638225",
  appId: "1:1051126638225:web:bccebfac184fc22d368130"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Inisialisasi Auth dan Firestore setelah Firebase diinisialisasi
const auth = getAuth(firebase);
const db = getFirestore(firebase);
const googleProvider = new GoogleAuthProvider();

// Export auth, googleProvider, dan db
export { auth, googleProvider, db };
