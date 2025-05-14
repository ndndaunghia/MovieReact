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
  apiKey: "AIzaSyD4-MZLAIsjxAQ_cQzhSlmtOr5C61NZCcI",
  authDomain: "moviereact-390bb.firebaseapp.com",
  databaseURL: "https://moviereact-390bb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moviereact-390bb",
  storageBucket: "moviereact-390bb.firebasestorage.app",
  messagingSenderId: "43738958559",
  appId: "1:43738958559:web:9b4ac652293438fc96776a",
  measurementId: "G-YV8QJ1WEH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const database = getDatabase(app);
export const firebaseAppPromise = Promise.resolve(app);
export { database };
export default app;
// // const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD4-MZLAIsjxAQ_cQzhSlmtOr5C61NZCcI",
//   authDomain: "moviereact-390bb.firebaseapp.com",
//   projectId: "moviereact-390bb",
//   storageBucket: "moviereact-390bb.firebasestorage.app",
//   messagingSenderId: "43738958559",
//   appId: "1:43738958559:web:9b4ac652293438fc96776a",
//   measurementId: "G-YV8QJ1WEH5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);