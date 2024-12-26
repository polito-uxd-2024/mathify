import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

// Configurazione di Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3aA2EoK_XLkjYCSeaRg2mTcB4awgdabI",
    authDomain: "mathify-by-smartlearn.firebaseapp.com",
    databaseURL: "https://mathify-by-smartlearn-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mathify-by-smartlearn",
    storageBucket: "mathify-by-smartlearn.firebasestorage.app",
    messagingSenderId: "496254512278",
    appId: "1:496254512278:web:581f3faaad89c305e026b7",
    measurementId: "G-DYMH6SSGJP"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Ottieni il riferimento al database
const db = getDatabase(app);

export {app, db};