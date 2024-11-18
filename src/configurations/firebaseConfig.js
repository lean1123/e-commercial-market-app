// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZebrjTkLfs4-Gg35njS5enhmg2alfoEE",
  authDomain: "e-commercial-market-app.firebaseapp.com",
  projectId: "e-commercial-market-app",
  storageBucket: "e-commercial-market-app.firebasestorage.app",
  messagingSenderId: "1089679501795",
  appId: "1:1089679501795:web:df84385b15638c137358d6",
  measurementId: "G-NFM15EWLSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
