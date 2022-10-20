// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage} from 'firebase/storage'
// import { getAnalytics } from 'firebase/analytics';
// import { getDatabase, ref, set, update } from 'firebase/database';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/database';
import {  } from "firebase/firestore"; 
import {
  // GoogleAuthProvider,
  getAuth,
  // signInWithPopup,
  // browserSessionPersistence,
  // setPersistence,
  // signOut
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  // query,
  // getDocs,
  // collection,
  // where,
  // addDoc,
  // updateDoc,
  // doc,
  // serverTimestamp,
  writeBatch
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase pr
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBJa_mE5gTeRvwYiS0cRKICJpG4JDI8iig',
  authDomain: 'todo-with-firebase-93907.firebaseapp.com',
  projectId: 'todo-with-firebase-93907',
  storageBucket: 'todo-with-firebase-93907.appspot.com',
  messagingSenderId: '46109416380',
  appId: '1:46109416380:web:bca05257a4e36b169929b9',
  measurementId: 'G-KJ79N66W91'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

const batch = writeBatch(db);

export {auth, db, storage, batch}