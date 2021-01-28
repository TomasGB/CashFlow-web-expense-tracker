import Head from "next/head";
import styles from "../styles/login.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Sign up | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Sign Up to CashFlow!</h1>
                <div className={styles.Form}>
                    <label className={styles.formLabel}>name</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter your Name"
                        name="Name"
                        required></input>
                    <label className={styles.formLabel}>Email</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        required></input>
                    <label className={styles.formLabel}>Password</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Enter your password"
                        name="password"
                        required></input>
                    <label className={styles.formLabel}>Confirm Password</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Confirm your password"
                        name="passwordConfirm"
                        required></input>
                    <button type="submit" className={styles.formBtn}>
                        Sign up
                    </button>
                </div>
            </body>
        </div>
    );
}
