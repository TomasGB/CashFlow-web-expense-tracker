import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import initFirebase from "../services/firebase";
import styles from "../styles/TransactionList.module.css";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TransactionList = () => {
    initFirebase();
    let currentUserUID = firebase.auth().currentUser.uid;

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(`${currentUserUID}`)
            .collection("transactionsList")
            .orderBy("dateId", "desc")
            .onSnapshot((querySnapshot) => {
                const transactions = [];

                querySnapshot.docs.forEach((doc) => {
                    transactions.push({
                        id: doc.id,
                        description: doc.data().Description,
                        amount: doc.data().Amount,
                        type: doc.data().Type,
                        dateId: doc.data().dateId,
                        dateString: doc.data().DateString,
                        category: doc.data().Category,
                    });
                });
                setTransactions(transactions);
            });
    }, []);

    return (
        <div className={styles.wrapper}>
            <h4 style={{ marginLeft: "35px" }}>Transaction History</h4>
            <div className={styles.container}>
                {transactions.length >= 1
                    ? transactions.map((transaction, dateId) => {
                          return (
                              <li className={styles.transaction} key={dateId}>
                                  <div className={styles.transactionTop}>
                                      <b>{transaction.description}:</b>{" "}
                                      {transaction.type == "Income" ? (
                                          <FontAwesomeIcon
                                              icon={faCaretUp}
                                              className={styles.ArrowIncome}
                                          />
                                      ) : (
                                          <FontAwesomeIcon
                                              icon={faCaretUp}
                                              className={styles.ArrowExpense}
                                          />
                                      )}
                                  </div>
                                  <div className={styles.transactionBottom}>
                                      <ul>
                                          <li>$ {transaction.amount}</li>
                                          <li>{transaction.dateString}</li>
                                      </ul>
                                  </div>
                              </li>
                          );
                      })
                    : "No transactions"}
            </div>
            <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
        </div>
    );
};
export default TransactionList;