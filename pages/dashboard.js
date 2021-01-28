import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
    async function loggingOut() {
        try {
            await firebase.auth().signOut();
            console.log("logged out!");
            Router.push("/");
        } catch (err) {
            alert("Something went wrong!", err.message);
            console.log("Something went wrong!", err.message);
        }
    }

    let currentUserUID = firebase.auth().currentUser;

    const [Name, setName] = useState("");

    useEffect(() => {
        async function getUserInfo() {
            let doc = await firebase
                .firestore()
                .collection("users")
                .doc(currentUserUID.uid)
                .get();

            if (!doc.exists) {
                alert("No user data found!");
            } else {
                let dataObj = doc.data();
                setName(dataObj.Name);
            }
        }
        getUserInfo();
    });

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection("transactions")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                const transactions = [];

                querySnapshot.docs.forEach((doc) => {
                    transactions.push({
                        id: doc.id,
                        description: doc.data().Description,
                        amount: doc.data().Amount,
                        type: doc.data().Type,
                        dateId: doc.data().dateId,
                        dateString: doc.data().DateString,
                        category: doc.data().Category,
                    });
                });
                setTransactions(transactions);
            });
    }, []);
    console.log(transactions);

    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Hello, {Name}</h1>
                <h4>Transaction History</h4>
                <button
                    type="submit"
                    className={styles.formBtn}
                    onClick={loggingOut}>
                    Log Out
                </button>
            </body>
        </div>
    );
}
