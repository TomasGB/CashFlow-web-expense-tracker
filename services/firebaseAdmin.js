import { credential, database } from "firebase-admin";
import admin from "firebase-admin";

const serviceAccount = require("../secrets.json");

export const verifyIdToken = (token) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://cashflow-5f59e.firebaseapp.com",
        });
    }
    return admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
            console.log(error);
        });
};
