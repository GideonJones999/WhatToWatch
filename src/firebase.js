import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  disableNetwork,
} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOAy09skuK3eg8AU8yaNhTRp1bO9U_X2E",
  authDomain: "movie-pick-click.firebaseapp.com",
  projectId: "movie-pick-click",
  storageBucket: "movie-pick-click.firebasestorage.app",
  messagingSenderId: "40024002722",
  appId: "1:40024002722:web:30796b6cec84c8c51a07fb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Disable offline persistence temporarily (ideal for development)
disableNetwork(db)
  .then(() => {
    console.log("Firestore is offline (no persistence) for debugging.");
  })
  .catch((error) => {
    console.error("Error disabling Firestore persistence:", error);
  });

export {
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  db,
  doc,
  setDoc,
  getDoc,
};
