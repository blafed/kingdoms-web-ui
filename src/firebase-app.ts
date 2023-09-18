// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7evnLsKYKOs7g3TwptfZLSuhdGr_P7ik",
  authDomain: "spier-8c15a.firebaseapp.com",
  databaseURL: "https://spier-8c15a-default-rtdb.firebaseio.com",
  projectId: "spier-8c15a",
  storageBucket: "spier-8c15a.appspot.com",
  messagingSenderId: "960284906404",
  appId: "1:960284906404:web:0c0ba204dde9560b89a731",
  measurementId: "G-S8DKQ36DJZ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app

const storage = getStorage(app)
export { storage }
