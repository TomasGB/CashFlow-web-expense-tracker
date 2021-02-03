import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import "firebase/auth";
import "firebase/firestore";
import initFirebase from "../services/firebase";

export default function Home() {
    initFirebase();
    return (
        <div className={styles.container}>
            <Head>
                <title>CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1 className={styles.title}>Welcome to CashFlow!</h1>
                <div className={styles.logoWrapper}>
                    <img className={styles.logo} src="logo.png" />
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
        </div>
    );
}
