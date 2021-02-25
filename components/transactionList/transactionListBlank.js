import React from "react";
import "firebase/auth";
import "firebase/firestore";
import styles from "../../styles/TransactionList.module.css";

const TransactionListBlank = () => {
    return <div className={styles.wrapper}></div>;
};
export default TransactionListBlank;
