// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log("API Key", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Auth Domain", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("Project ID", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("App ID", import.meta.env.VITE_FIREBASE_APP_ID);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);