// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBct-d2LaWY-euFwHjy3Yqjr3nKGImqlro",
  authDomain: "moviereactapp-3422d.firebaseapp.com",
  projectId: "moviereactapp-3422d",
  storageBucket: "moviereactapp-3422d.appspot.com",
  messagingSenderId: "456877309854",
  appId: "1:456877309854:web:e8f0c4530344ffb2eee08f",
  measurementId: "G-3VDB4QQTXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const database = getDatabase(app);
export const firebaseAppPromise = Promise.resolve(app);
export { database };
export default app;
// const analytics = getAnalytics(app);