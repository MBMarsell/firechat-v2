import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'firechat2-263bc.firebaseapp.com',
  projectId: 'firechat2-263bc',
  storageBucket: 'firechat2-263bc.appspot.com',
  messagingSenderId: '541714088502',
  appId: '1:541714088502:web:52544f6c7b3885923bce97',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
