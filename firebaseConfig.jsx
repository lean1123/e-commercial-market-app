// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnUdzm03o3QenvA64UdL-bYwx99CB9_NY",
  authDomain: "community-marketplace-73654.firebaseapp.com",
  projectId: "community-marketplace-73654",
  storageBucket: "community-marketplace-73654.appspot.com",
  messagingSenderId: "859158941584",
  appId: "1:859158941584:web:33c2ed55e3b330a95aed15",
  measurementId: "G-CFXG36GYHN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
