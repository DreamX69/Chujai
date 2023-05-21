// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSqcpsx0mr9L_a1ushfvfqZsx1nNSGl5w",
  authDomain: "chujai-8a2f5.firebaseapp.com",
  projectId: "chujai-8a2f5",
  storageBucket: "chujai-8a2f5.appspot.com",
  messagingSenderId: "71290425699",
  appId: "1:71290425699:web:f8bde8ed15e952d08d4356",
  measurementId: "G-8GK5H8R9BS",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
