import Head from "next/head";
import styles from "../styles/login.module.css";

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Login to CashFlow!</h1>
                <div className={styles.Form}>
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
                    <button type="submit" className={styles.formBtn}>
                        Login
                    </button>
                </div>
            </body>
        </div>
    );
}
