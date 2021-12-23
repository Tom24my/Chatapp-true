import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWuB8oG1Dzim_6G70Rulyqyi1fd6NmeXw",
    authDomain: "chat-app-36-b2.firebaseapp.com",
    databaseURL: "https://chat-app-36-b2.firebaseio.com",
    projectId: "chat-app-36-b2",
    storageBucket: "chat-app-36-b2.appspot.com",
    messagingSenderId: "184471945178",
    appId: "1:184471945178:web:509d6b0dd3bb49b6c60ae3"
};

firebase.initializeApp(firebaseConfig);

export default firebase
export const auth = firebase.auth();
export const db = firebase.firestore();