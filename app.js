// Firebase configuration
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBIYSK7Z7rEMC5jSEJblGK-OoN9z0rzIGU",
    authDomain: "exam-scoreboard.firebaseapp.com",
    databaseURL: "https://exam-scoreboard-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "exam-scoreboard",
    storageBucket: "exam-scoreboard.firebasestorage.app",
    messagingSenderId: "610273763122",
    appId: "1:610273763122:web:6883a8a67ea2838c87c12b",
    measurementId: "G-RMTPK1SGXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export database functions
export { database, ref, get, set, push, onValue };

