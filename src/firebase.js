import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQ4foze2n6KICUPEm4qKEdnYff497LoEI",
  authDomain: "adminec-ca7b8.firebaseapp.com",
  projectId: "adminec-ca7b8",
  storageBucket: "adminec-ca7b8.appspot.com",
  messagingSenderId: "725049057926",
  appId: "1:725049057926:web:1d9234d0d60a05dbafe707",
};

const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);