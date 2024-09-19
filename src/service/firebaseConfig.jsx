// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuviUTH06DWpAhLzegSW4YDCQmba-Tx4c",
  authDomain: "trip-planner-7b305.firebaseapp.com",
  projectId: "trip-planner-7b305",
  storageBucket: "trip-planner-7b305.appspot.com",
  messagingSenderId: "461167296703",
  appId: "1:461167296703:web:58ed8f7b90274e9b03860a",
  measurementId: "G-HSBRF6W5PL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);