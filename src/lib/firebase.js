import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDBLQ6kG0u1A09hsyst0h5vdYlEr3c5Uf8",
  authDomain: "smartframe-i.firebaseapp.com",
  databaseURL: "https://smartframe-i.firebaseio.com",
  projectId: "smartframe-i",
  storageBucket: "smartframe-i.appspot.com",
  messagingSenderId: "840071579901",
  appId: "1:840071579901:web:c8b2279d95a54cbef65694"
};

firebase.initializeApp(firebaseConfig)

export default firebase

