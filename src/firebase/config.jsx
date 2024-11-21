import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAobDRK6HxQIEn5_SW4jzSPTrzhzUKbdY0",
  authDomain: "olx-react-clone-35350.firebaseapp.com",
  projectId: "olx-react-clone-35350",
  storageBucket: "olx-react-clone-35350.firebasestorage.app",
  messagingSenderId: "1095571775281",
  appId: "1:1095571775281:web:57493f6b768cacbc971a10"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
