import * as firebaseAdmin from 'firebase-admin'
const firebase = require('firebase')
import { firebase_creds } from "../config/firebase"


let firebaseApp: firebaseAdmin.app.App;


// Initialize Firebase admin to access Firestore from the server
firebaseApp = firebase.initializeApp({ ...firebase_creds })
let database: any = firebaseApp.database()

export {
    firebaseApp,
    database
}