import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyxBTlfF-N4EcvQwZltldYjhep9fXz3uE",
    authDomain: "whatsapp-clone-36d8b.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-36d8b.firebaseio.com",
    projectId: "whatsapp-clone-36d8b",
    storageBucket: "whatsapp-clone-36d8b.appspot.com",
    messagingSenderId: "254738677021",
    appId: "1:254738677021:web:66b1ecb7f08390415a35f4",
    measurementId: "G-JKPR7DHV8X"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
