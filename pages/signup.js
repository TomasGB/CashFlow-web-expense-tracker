import Head from "next/head";
import styles from "../styles/signup.module.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import initFirebase from "../services/firebase";
import Router from "next/router";

initFirebase();

export default function SignUpPage() {
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emptyState = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };
    console.log(Name);
    console.log(email);
    async function registration(email, password, Name) {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            const currentUser = firebase.auth().currentUser;
            console.log(currentUser.uid);
            const user = {
                uid: currentUser.uid,
                Name: Name,
                Email: email,
                Password: password,
            };
            const db = firebase.firestore();

            db.collection("users").doc(currentUser.uid).set(user);
            console.log(`${Name} has been registered.`);
        } catch (err) {
            alert("Something went wrong!", err.message);
            console.log(err.message);
        }
    }

    const handleSignup = () => {
        if (!Name) {
            alert("Name is required");
        } else if (!email) {
            alert("Email field is required.");
        } else if (!password) {
            alert("Password field is required.");
        } else if (!confirmPassword) {
            setPassword("");
            alert("Confirm password field is required.");
        } else if (password !== confirmPassword) {
            alert("Password does not match!");
        } else {
            registration(email, password, Name);
            Router.push("/dashboard");
            emptyState();
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Sign up | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Sign Up to CashFlow!</h1>
                <div className={styles.Form}>
                    <label className={styles.formLabel}>Name</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter your Name"
                        name="Name"
                        onChange={(Name) => setName(Name.target.value)}
                        required></input>
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
                    <label className={styles.formLabel}>Confirm Password</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        onChange={(confirmPassword) =>
                            setConfirmPassword(confirmPassword.target.value)
                        }
                        required></input>
                    <button
                        type="submit"
                        className={styles.formBtn}
                        onClick={handleSignup}>
                        Sign up
                    </button>
                </div>
            </body>
        </div>
    );
}
