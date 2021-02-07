import React from "react";
import "firebase/auth";
import "firebase/firestore";
import styles from "../styles/TransactionList.module.css";

const TransactionListBlank = () => {
    return (
        <div className={styles.wrapper}>
            <b style={{ fontSize: "25px" }}>Transaction History</b>
        </div>
    );
};
export default TransactionListBlank;
