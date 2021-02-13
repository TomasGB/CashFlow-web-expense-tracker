import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../services/auth";

export default function Home() {
    const { user } = useAuth();
    return (
        <main className={styles.container}>
            <Head>
                <title>CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#4083E6" />
                <meta
                    name="description"
                    content="Personal finance app, to keep track of your incomes and expenses."
                />
            </Head>
            <div>
                <h1 className={styles.title}>Welcome to CashFlow!</h1>
                <div className={styles.logoWrapper}>
                    <img
                        className={styles.logo}
                        src="logo.png"
                        alt="CashFlow-App-Logo"
                    />
                </div>
                <h4 className={styles.phrase}>
                    Please login or sign up to start
                </h4>
                <div className={styles.linkBtnWrapper}>
                    <div className={styles.linkBtn}>
                        <Link href="/login">Login</Link>
                    </div>
                    <div className={styles.linkBtn}>
                        <Link href="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
            <div style={{ justifyContent: "center", marginTop: 15 }}>
                <p className={styles.copyright}>© Tomas Gomez Bermudez</p>
            </div>
        </main>
    );
}
