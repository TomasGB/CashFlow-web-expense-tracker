import Head from "next/head";
import styles from "../styles/Dashboard.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dashboard | CashFlow</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body id="body">
                <h1 className={styles.title}>Hello</h1>
            </body>
        </div>
    );
}
