import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
}

firebase.initializeApp(firebaseConfig)

// 인증 기능 export
export const authService = firebase.auth()
// database export.. firestore instance
export const dbService = firebase.firestore()
// File upload
export const storageService = firebase.storage()

export const firebaseInstance = firebase