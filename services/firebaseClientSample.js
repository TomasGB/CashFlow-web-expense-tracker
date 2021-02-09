import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "yours",
    authDomain: "yours",
    projectId: "yours",
    storageBucket: "yours",
    messagingSenderId: "yours",
    appId: "yours",
    measurementId: "yours",
};

export default function firebaseClient() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("connected with firebase..");
    }
}
