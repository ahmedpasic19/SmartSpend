import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBAVyFoAeUb1RjA4D8V30gupu9NZK-k4ls',
  authDomain: 'paycheck-4172e.firebaseapp.com',
  projectId: 'paycheck-4172e',
  storageBucket: 'paycheck-4172e.appspot.com',
  messagingSenderId: '511011525597',
  appId: '1:511011525597:web:75b6b092407b6e76599c34',
  measurementId: 'G-E97MZS3KX4',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
