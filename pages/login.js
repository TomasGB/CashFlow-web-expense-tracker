import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/login.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";

/*initFirebase();*/

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emptyState = () => {
        setEmail("");
        setPassword("");
    };

    async function signIn(email, password) {
        try {
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            const { user, credentials } = response;

            console.log(`logged in as ${user.email}`);
        } catch (err) {
            alert("Something went wrong!", err.message);
            console.log(`Error: ${err.message}`);
        }
    }

    const handleSignIn = () => {
        if (!email) {
            alert("Email field is required.");
        } else if (!password) {
            alert("Password field is required.");
        } else {
            signIn(email, password);
            Router.push("/dashboard");
            emptyState();
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Login to CashFlow!</h1>
                <div className={styles.Form}>
                    <label className={styles.formLabel}>Email</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        onChange={(email) => setEmail(email.target.value)}
                        required></input>
                    <label className={styles.formLabel}>Password</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter your password"
                        name="password"
                        onChange={(password) =>
                            setPassword(password.target.value)
                        }
                        required></input>
                    <button
                        type="submit"
                        onClick={handleSignIn}
                        className={styles.formBtn}>
                        Login
                    </button>
                </div>
            </body>
        </div>
    );
}
