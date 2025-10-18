// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCfIrbptNmfzCy2LdvtUviSt8Ry-ZSrMtc",
	authDomain: "pitchcraft-d99a0.firebaseapp.com",
	projectId: "pitchcraft-d99a0",
	storageBucket: "pitchcraft-d99a0.firebasestorage.app",
	messagingSenderId: "218186971263",
	appId: "1:218186971263:web:67f9182a008f09d8b8674a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
