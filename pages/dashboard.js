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
import {
    faPercent,
    faPlus,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
    initFirebase();

    let currentUserUID = firebase.auth().currentUser.uid;

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
                .doc(currentUserUID)
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
            </Head>
            <div>
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
                            <p>Log Out</p>
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                style={{
                                    width: "15px",
                                    marginLeft: "10px",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                }}
                            />
                        </button>
                        <button
                            type="submit"
                            className={styles.formBtn}
                            onClick={addTransaction}>
                            <p>Add transaction</p>
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{
                                    width: "10px",
                                    marginLeft: "10px",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                }}
                            />
                        </button>
                        <button
                            type="submit"
                            className={styles.formBtn}
                            onClick={goToAnalyticsPage}>
                            <p>Analytics</p>
                            <FontAwesomeIcon
                                icon={faPercent}
                                style={{
                                    width: "10px",
                                    marginLeft: "10px",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                }}
                            />
                        </button>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <Balance />
                    <TransactionList />
                    <div style={{ marginTop: "50px" }}>
                        <b className={styles.subtitle}>Analytics Summary</b>
                        <IncomeChart />
                        <ExpenseChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
