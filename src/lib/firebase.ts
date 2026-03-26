import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAru7qZX8Gu_b8Y3oNDV-a5PmkrrkRjkcs",
  authDomain: "jaharta-rp.firebaseapp.com",
  projectId: "jaharta-rp",
  storageBucket: "jaharta-rp.firebasestorage.app",
  messagingSenderId: "217075417489",
  appId: "1:217075417489:web:4d1e2df422a5cd42411a30",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
