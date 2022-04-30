import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGa7FwVxQrw-AX4OzGRJgqNxzKdWiJcoQ",
  authDomain: "easyrentable-7b59c.firebaseapp.com",
  projectId: "easyrentable-7b59c",
  storageBucket: "easyrentable-7b59c.appspot.com",
  messagingSenderId: "891170990055",
  appId: "1:891170990055:web:1603aa5c4c9964754d3f42"
};
var db
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  db.settings({
    experimentalForceLongPolling: true,
  })
}



export {firebase,db};
