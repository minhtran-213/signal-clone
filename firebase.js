import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC1lJSLn7ZCTIV_AKq8hLzfRIbkeloCevA',
  authDomain: 'signal-clone-12118.firebaseapp.com',
  projectId: 'signal-clone-12118',
  storageBucket: 'signal-clone-12118.appspot.com',
  messagingSenderId: '972361547410',
  appId: '1:972361547410:web:b02e8e76789c7d5291b04b',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
