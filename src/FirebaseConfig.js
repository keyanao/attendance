// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWghJwW2GqGYBpKuhR8LcltR0fli_vBXM",
  authDomain: "attendance-8e681.firebaseapp.com",
  projectId: "attendance-8e681",
  storageBucket: "attendance-8e681.appspot.com",
  messagingSenderId: "261854301692",
  appId: "1:261854301692:web:57e7b87fd600ac8a1ab679",
  measurementId: "G-54EWF11FRE"
};
const apps = getApps();
if (!apps.length) {
  initializeApp(firebaseConfig);
}
// Initialize Firebase
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
