// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtrit-wYscvhcNRXUpcBmDX61thBw_KRQ",
  authDomain: "to-do-list-new-aa0b8.firebaseapp.com",
  projectId: "to-do-list-new-aa0b8",
  storageBucket: "to-do-list-new-aa0b8.firebasestorage.app",
  messagingSenderId: "601633506881",
  appId: "1:601633506881:web:401204237ae4763a6aa8c0",
  measurementId: "G-01JNP9CG54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };