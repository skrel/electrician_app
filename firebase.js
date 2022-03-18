// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJqnTgM6I9vc5h45x_8CxkfKK085_wG1E",
  authDomain: "electrician-app-70e32.firebaseapp.com",
  projectId: "electrician-app-70e32",
  storageBucket: "electrician-app-70e32.appspot.com",
  messagingSenderId: "424462050984",
  appId: "1:424462050984:web:127e92812741f7c78b449d"
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

export {auth};