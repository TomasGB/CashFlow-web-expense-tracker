import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Loading() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Loading| CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Personal finance app, to keep track of your incomes and expenses."
                />
            </Head>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>CashFlow</h1>
                <div className={styles.logoWrapper}>
                    <img
                        className={styles.logo}
                        src="logo.png"
                        alt="CashFlow-App-Logo"
                    />
                </div>
            </div>
        </div>
    );
}
