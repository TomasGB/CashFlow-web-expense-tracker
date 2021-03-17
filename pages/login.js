import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/login.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import firebaseClient from "../services/firebaseClient";

export default function LoginPage() {
    firebaseClient();

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
            Router.push("/dashboard");
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

            emptyState();
        }
    };

    return (
        <main className={styles.container}>
            <Head>
                <title>Login | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Personal finance app, to keep track of your incomes and expenses."
                />
            </Head>
            <div>
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
                        type="password"
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
            </div>
        </main>
    );
}
