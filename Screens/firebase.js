import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8DkImO_VpwhMMQFcEqg1pUgKWL_Y12Q8',
  authDomain: 'easyrentable-c0af0.firebaseapp.com',
  projectId: 'easyrentable-c0af0',
  storageBucket: 'easyrentable-c0af0.appspot.com',
  messagingSenderId: '242305993645',
  appId: '1:242305993645:web:d202b207d3b2d1051e6f24',
};
var db;
var fb;
if (!firebase.apps.length) {
  fb = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  db.settings({
    experimentalForceLongPolling: true,
  });
}

export {firebase, fb, db};
