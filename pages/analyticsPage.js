import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/analyticsPage.module.css";
import IncomeChart from "../components/charts/incomeChart";
import ExpenseChart from "../components/charts/expenseChart";
import BlankChart from "../components/charts/blankCharts";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../services/auth";
import firebaseClient from "../services/firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import Loading from "./loadingPage";

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

export default function Analytics({ session }) {
    const { user } = useAuth();
    firebaseClient();

    if (user != null) {
        return (
            <main className={styles.container}>
                <Head>
                    <title>Analytics | CashFlow</title>
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
                        <h1 className={styles.title}>Analytics</h1>
                        <nav className={styles.navbar}>
                            <button
                                type="submit"
                                className={styles.formBtn}
                                onClick={goToDashboardPage}>
                                <p className={styles.p}>Dashboard</p>
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className={styles.icons}
                                />
                            </button>
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
                        </nav>
                    </div>
                    <div className={styles.wrapper}>
                        {user.uid != null ? (
                            <div>
                                <IncomeChart uid={user.uid} />
                                <ExpenseChart uid={user.uid} />
                            </div>
                        ) : (
                            <div>
                                <BlankChart />
                                <BlankChart />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        );
    } else {
        return <Loading />;
    }
}
function addTransaction() {
    Router.push("/addTransaction");
}
function goToDashboardPage() {
    Router.push("/dashboard");
}
