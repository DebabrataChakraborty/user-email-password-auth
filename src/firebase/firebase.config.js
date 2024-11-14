// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSUg79bI9mUiJUkxb2u74ToibHNfVxmq0",
  authDomain: "user-email-password-auth-7a2fe.firebaseapp.com",
  projectId: "user-email-password-auth-7a2fe",
  storageBucket: "user-email-password-auth-7a2fe.firebasestorage.app",
  messagingSenderId: "1045319931760",
  appId: "1:1045319931760:web:148f9d0699c6b33d5aa1b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;