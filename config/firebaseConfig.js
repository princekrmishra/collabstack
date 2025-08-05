// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "collabstack-11a17.firebaseapp.com",
  projectId: "collabstack-11a17",
  storageBucket: "collabstack-11a17.firebasestorage.app",
  messagingSenderId: "135056362271",
  appId: "1:135056362271:web:c4e87025cbb75b2bab3e2a",
  measurementId: "G-4FW2HQBVKN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
if (typeof window !== 'undefined') {
  getAnalytics(app);
}