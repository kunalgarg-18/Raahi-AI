// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEUWCgwO9xF3Km03gq35GnkK4CzpHSjYk",
  authDomain: "raahi-6b1e7.firebaseapp.com",
  projectId: "raahi-6b1e7",
  storageBucket: "raahi-6b1e7.appspot.com",
  messagingSenderId: "1029651040025",
  appId: "1:1029651040025:web:9802df600f253c15556788",
  measurementId: "G-2D3CB1NCF2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);