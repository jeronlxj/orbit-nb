// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Import authentication 
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { UserAuth } from '../context/AuthContext';

// Import firestore 
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDF-HxTp2OIrQs9kAFdrKS1Znvyx66YIY",
  authDomain: "bookingwebapp-8bfa9.firebaseapp.com",
  projectId: "bookingwebapp-8bfa9",
  storageBucket: "bookingwebapp-8bfa9.appspot.com",
  messagingSenderId: "254879504393",
  appId: "1:254879504393:web:394822ed9278a06d1d40d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// getting authentication and exporting it out
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
// export const { user, logout } = UserAuth();

// exporting firestore
export const db = getFirestore();