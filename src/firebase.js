import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYjDVWGnbhEG8rzjl1iK0nFeV5R_7c3Go",
  authDomain: "florea-c84c3.firebaseapp.com",
  projectId: "florea-c84c3",
  storageBucket: "florea-c84c3.firebasestorage.app",
  messagingSenderId: "686894895983",
  appId: "1:686894895983:web:5ac147beeb9340c05d8e9a",
  measurementId: "G-00DBS32042",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
