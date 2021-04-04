import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDToj_vQxGpxiHSMJmuVIhXvBMU3pcN6Zo",
    authDomain: "react-whatsapp-clone-85ea1.firebaseapp.com",
    projectId: "react-whatsapp-clone-85ea1",
    storageBucket: "react-whatsapp-clone-85ea1.appspot.com",
    messagingSenderId: "414383647876",
    appId: "1:414383647876:web:d17e65db50a498b0bfa6d1",
    measurementId: "G-50PP74XNXW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
