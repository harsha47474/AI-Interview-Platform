import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "colloquium-b776e.firebaseapp.com",
  projectId: "colloquium-b776e",
  storageBucket: "colloquium-b776e.firebasestorage.app",
  messagingSenderId: "79628189800",
  appId: "1:79628189800:web:58027e58630ad242327bdd"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}