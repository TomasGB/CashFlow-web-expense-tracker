import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import initFirebase from "../services/firebase";
import styles from "../styles/TransactionList.module.css";
import { faCaretUp, faTrash } from "@fortawesome/free-solid-svg-icons";
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

    const deleteTransaction = async (id) => {
        await firebase
            .firestore()
            .collection("users")
            .doc(`${currentUserUID}`)
            .collection("transactionsList")
            .doc(id)
            .delete()
            .then(function () {
                alert("Transaction successfully deleted!");
            })
            .catch(function (error) {
                alert("Error removing transaction: ", error);
                console.log("Error removing transaction: ", error);
            });
    };

    return (
        <div className={styles.wrapper}>
            <b style={{ fontSize: "25px" }}>Transaction History</b>
            <div className={styles.container}>
                {transactions.length >= 1
                    ? transactions.map((transaction, dateId) => {
                          return (
                              <li className={styles.transaction} key={dateId}>
                                  <div className={styles.transactionTop}>
                                      <div
                                          style={{
                                              marginRight: "100px",
                                              width: "100px",
                                          }}>
                                          <b
                                              style={{
                                                  width: "fit-content",
                                              }}>
                                              {transaction.description}:
                                          </b>
                                      </div>
                                      <div>
                                          {transaction.type == "Income" ? (
                                              <FontAwesomeIcon
                                                  icon={faCaretUp}
                                                  className={styles.ArrowIncome}
                                              />
                                          ) : (
                                              <FontAwesomeIcon
                                                  icon={faCaretUp}
                                                  className={
                                                      styles.ArrowExpense
                                                  }
                                              />
                                          )}
                                      </div>
                                  </div>
                                  <div className={styles.transactionBottom}>
                                      <ul>
                                          {transaction.type == "Expense" ? (
                                              <li>$ -{transaction.amount}</li>
                                          ) : (
                                              <li>$ {transaction.amount}</li>
                                          )}
                                          <li>{transaction.dateString}</li>
                                      </ul>
                                      <div
                                          onClick={() => {
                                              deleteTransaction(transaction.id);
                                          }}>
                                          <FontAwesomeIcon
                                              icon={faTrash}
                                              className={styles.deleteBtn}
                                          />
                                      </div>
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
