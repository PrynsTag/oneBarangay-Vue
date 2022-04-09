import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
declare let self: ServiceWorkerGlobalScope;

const firebaseConfig = {
  apiKey: "AIzaSyBFHIY07QF7_HQOaxgPdng648sZgIyL3Wg",
  authDomain: "onebarangay-malanday.firebaseapp.com",
  projectId: "onebarangay-malanday",
  storageBucket: "onebarangay-malanday.appspot.com",
  messagingSenderId: "151952863728",
  appId: "1:151952863728:web:7660ee42c28cd0b391ad35",
  measurementId: "G-MJRG0CGME7"
};

const app = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(app);
export const firebaseMessaging = getMessaging(app);
