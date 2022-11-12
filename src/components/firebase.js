import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBopIirOdPqruoA6_clXnrsgW0_jk7L154",
    authDomain: "company-positions-management.firebaseapp.com",
    projectId: "company-positions-management",
    storageBucket: "company-positions-management.appspot.com",
    messagingSenderId: "3574475400",
    appId: "1:3574475400:web:f3fc6db83b869d40c08d3d",
    databaseURL: "https://company-positions-management-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
