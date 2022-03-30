// Import the functions you need from the SDKs you need
//import { getFirestore } from "firebase/firestore";
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIBeonHXcKdbqiKk8q2ATvh-SPXCEHg6o",
    authDomain: "fir-auth-f89a2.firebaseapp.com",
    projectId: "fir-auth-f89a2",
    storageBucket: "fir-auth-f89a2.appspot.com",
    messagingSenderId: "333521430864",
    appId: "1:333521430864:web:77c5fb5ccea596f6d9e455",
    measurementId: "G-P1P1NP5YT6"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
//const database = firebase.database()
export { auth,firebase };
