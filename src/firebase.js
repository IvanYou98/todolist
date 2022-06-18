// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCJ-rpSNWBZlwq0t5JveV9FlxFbZRzf5RE",
    authDomain: "todolist-6eb14.firebaseapp.com",
    projectId: "todolist-6eb14",
    storageBucket: "todolist-6eb14.appspot.com",
    messagingSenderId: "158898376876",
    appId: "1:158898376876:web:bd1880d7d4365690c58f09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();


