// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo1mFK6S5hkcKVjaeXjK3HggRqAs6i1zo",
  authDomain: "book-8a526.firebaseapp.com",
  databaseURL: "https://book-8a526-default-rtdb.firebaseio.com",
  projectId: "book-8a526",
  storageBucket: "book-8a526.appspot.com",
  messagingSenderId: "921278003297",
  appId: "1:921278003297:web:5b1ccecd99e1b8fee01220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
export const auth = getAuth(app);
export default db