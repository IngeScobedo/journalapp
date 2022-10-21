import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
const firebaseConfig = {
  apiKey: 'AIzaSyCOalvKQwT0-66twfaMEzZ-NR8cuJrSmEs',
  authDomain: 'redux-firestore-dc31f.firebaseapp.com',
  projectId: 'redux-firestore-dc31f',
  storageBucket: 'redux-firestore-dc31f.appspot.com',
  messagingSenderId: '520745021648',
  appId: '1:520745021648:web:f5c69b7888c1473eaceed5'
}

export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
