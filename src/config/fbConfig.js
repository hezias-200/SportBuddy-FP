import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config={
    apiKey: "AIzaSyBUR6P5mafV5z890WK7o9RIJnOHKIsVIwE",
    authDomain: "sport-buddy-322710.firebaseapp.com",
    projectId: "sport-buddy-322710",
    storageBucket: "sport-buddy-322710.appspot.com",
    messagingSenderId: "189190636592",
    appId: "1:189190636592:web:778631d510e6f4cd6b19f5",
    measurementId: "G-0ZSF2V76M2"

};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

const db = firebase.firestore()
const auth=firebase.auth()

const storage=firebase.storage();
export  {firebase as default ,storage,db,auth};
