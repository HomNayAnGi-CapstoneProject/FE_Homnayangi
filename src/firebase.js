// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

// google auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBwJ283rB29_IO22Z2TUooliAV24ZxgguI",
    authDomain: "homnayangi-files.firebaseapp.com",
    projectId: "homnayangi-files",
    storageBucket: "homnayangi-files.appspot.com",
    messagingSenderId: "323901768949",
    appId: "1:323901768949:web:de313d42ef39de3783f1bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app); // make reference to the storage

export const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}