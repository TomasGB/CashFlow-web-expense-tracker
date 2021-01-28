import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Welcome to CashFlow!</h1>
                <div className={styles.logoWrapper}>
                    <img className={styles.logo} src="logo.png" />
                </div>
                <h4 className={styles.phrase}>
                    Please login to start or sign up to start
                </h4>
                <div className={styles.linkBtnWrapper}>
                    <div className={styles.linkBtn}>
                        <Link href="/login">Login</Link>
                    </div>
                    <div className={styles.linkBtn}>
                        <Link href="/signup">Sign Up</Link>
                    </div>
                </div>
            </body>
        </div>
    );
}
