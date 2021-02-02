import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Dashboard.module.css";
import Balance from "../components/balance";
import TransactionList from "../components/transactionList";
import initFirebase from "../services/firebase";
import IncomeChart from "../components/incomeChart";
import ExpenseChart from "../components/expenseChart";

export default function Dashboard() {
    initFirebase();

    let currentUserUID = firebase.auth().currentUser;

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

    function addTransaction() {
        Router.push("/addTransaction");
    }
    function goToAnalyticsPage() {
        Router.push("/analytics");
    }

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

    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"></meta>
            </Head>
            <body id="body">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}>
                    <h1 className={styles.title}>Hello, {Name}</h1>
                    <div style={{ display: "flex", marginLeft: "25px" }}>
                        <button
                            type="submit"
                            className={styles.formBtn}
                            onClick={loggingOut}>
                            Log Out
                        </button>
                        <button
                            type="submit"
                            className={styles.formBtn}
                            onClick={addTransaction}>
                            Add Transactions
                        </button>
                        <button
                            type="submit"
                            className={styles.formBtn}
                            onClick={goToAnalyticsPage}>
                            Analytics
                        </button>
                    </div>
                    <div className={styles.wrapper}>
                        <Balance />
                        <TransactionList />
                        <div style={{ marginTop: "25px" }}>
                            <b>Analytics Summary</b>
                            <IncomeChart />
                            <ExpenseChart />
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}
