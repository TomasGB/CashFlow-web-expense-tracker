import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import Balance from "../components/balance";
import BalanceBlank from "../components/balanceBlank";
import TransactionList from "../components/transactionList";
import IncomeChart from "../components/incomeChart";
import ExpenseChart from "../components/expenseChart";
import BlankChart from "../components/blankCharts";
import {
    faChartBar,
    faPlus,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../services/auth";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import firebaseClient from "../services/firebaseClient";
import TransactionListBlank from "../components/transactionListBlank";

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const { uid, email } = token;
        return {
            props: { session: `email: ${email}, uid: ${uid}` },
        };
    } catch (error) {
        console.log(error);
        return { props: [] };
    }
}
export default function Dashboard({ session }) {
    const { user } = useAuth();
    firebaseClient();

    if (session) {
        const [Name, setName] = useState("");
        const [currentUserUID, setCurrentUserUID] = useState(null);

        useEffect(() => {
            async function getUserInfo() {
                if (user != null) {
                    //Getting user Name
                    let doc = await firebase
                        .firestore()
                        .collection("users")
                        .doc(user.uid)
                        .get();

                    if (!doc.exists) {
                        alert("No user data found!");
                    } else {
                        let dataObj = doc.data();
                        setName(dataObj.Name);
                    }
                    setCurrentUserUID(user.uid);
                } else {
                    return;
                }
            }
            getUserInfo();
        });
        return (
            <main className={styles.container}>
                <Head>
                    <title>Dashboard | CashFlow</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#4083E6" />
                    <meta
                        name="description"
                        content="Personal finance app, to keep track of your incomes and expenses."
                    />
                </Head>
                <div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}>
                        <h1 className={styles.title}>Hello, {Name}</h1>
                        <nav className={styles.navbar}>
                            <button
                                type="submit"
                                className={styles.formBtn}
                                onClick={addTransaction}>
                                <p className={styles.p}>Add transaction</p>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className={styles.icons}
                                />
                            </button>
                            <button
                                type="submit"
                                className={styles.formBtn}
                                onClick={goToAnalyticsPage}>
                                <p className={styles.p}>Analytics</p>
                                <FontAwesomeIcon
                                    icon={faChartBar}
                                    className={styles.icons}
                                />
                            </button>
                            <button
                                type="submit"
                                className={styles.formBtn}
                                onClick={loggingOut}>
                                <p className={styles.p}>Log Out</p>
                                <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    className={styles.icons}
                                />
                            </button>
                        </nav>
                    </div>
                    <div className={styles.wrapper}>
                        {currentUserUID != null ? (
                            <div>
                                <Balance uid={currentUserUID} />
                                <b className={styles.subtitle}>
                                    Transaction History
                                </b>
                                <TransactionList uid={currentUserUID} />{" "}
                            </div>
                        ) : (
                            <div>
                                <BalanceBlank />
                                <b className={styles.subtitle}>
                                    Transaction History
                                </b>
                                <TransactionListBlank />
                            </div>
                        )}
                        <div style={{ marginTop: "50px" }}>
                            <b className={styles.subtitle}>Analytics Summary</b>
                            {currentUserUID != null ? (
                                <div>
                                    <IncomeChart uid={currentUserUID} />
                                    <ExpenseChart uid={currentUserUID} />
                                </div>
                            ) : (
                                <div>
                                    <BlankChart />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    } else {
        Router.push("/login");
    }

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
        Router.push("/analyticsPage");
    }
}
