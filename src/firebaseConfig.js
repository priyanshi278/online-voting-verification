// Replace with your Firebase project credentials
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAUaTLnbna0JvEqBCYYbA4qsYaNrh_a7bs",
    authDomain: "voting-verification-syst-b1adb.firebaseapp.com",
    projectId: "voting-verification-syst-b1adb",
    storageBucket: "voting-verification-syst-b1adb.firebasestorage.app",
    messagingSenderId: "1075895628675",
    appId: "1:1075895628675:web:26184099dc3b55153dfcb6",
    measurementId: "G-SXRJ39952N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

