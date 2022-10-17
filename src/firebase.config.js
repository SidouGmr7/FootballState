import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBGvv-gBX4rT17fHkttpfXB3B0TJDw6o4',
  authDomain: 'footstatgmr.firebaseapp.com',
  projectId: 'footstatgmr',
  storageBucket: 'footstatgmr.appspot.com',
  messagingSenderId: '640444127897',
  appId: '1:640444127897:web:72af3692f15ef6b53b3608',
  measurementId: 'G-HK0JPX0C3R',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore()
