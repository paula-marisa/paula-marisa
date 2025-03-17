// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4uGldDifXtRjredas",
    authDomain: "webpage-paula.firebaseapp.com",
    projectId: "webpage-paula",
    storageBucket: "webpage-paula.appspot.com",
    messagingSenderId: "393099749333",
    appId: "1:393099749333:web:b30f010f8ee9f7b2157f5c",
    measurementId: "G-QNCT5BW3R5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
