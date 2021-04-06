import React, { useState, useEffect } from "react";
import Styles from "../../styles/Balance.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function Balance(props) {
    if (props.uid != null) {
        const [balance, setBalance] = useState(0);
        const [totIncome, setTotIncome] = useState(0);
        const [totExpense, setTotExpense] = useState(0);

        useEffect(() => {
            firebase
                .firestore()
                .collection("users")
                .doc(props.uid)
                .collection("transactionsList")
                .orderBy("dateId", "desc")
                .onSnapshot((querySnapshot) => {
                    let acumIncome = 0;
                    let acumExpenses = 0;
                    querySnapshot.docs.forEach((doc) => {
                        if (
                            (doc.data().Type == "expense") |
                            (doc.data().Type == "Expense")
                        ) {
                            acumExpenses =
                                acumExpenses + parseFloat(doc.data().Amount);
                        } else {
                            acumIncome =
                                acumIncome + parseFloat(doc.data().Amount);
                        }
                        let finalBal = acumIncome - acumExpenses;

                        setBalance(finalBal);
                    });

                    setTotIncome(acumIncome);
                    setTotExpense(acumExpenses);
                });
        }, []);
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignSelf: "center",
                    padding: 15,
                }}>
                <div
                    style={{
                        justifyContent: "center",
                        marginTop: 5,
                        marginBottom: 5,
                        color: "#000",
                    }}>
                    <div>
                        <b className={Styles.totalBalance}>Your Balance</b>
                        <h2 className={Styles.totalBalance}>
                            $ {balance.toFixed(2)}
                        </h2>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: 30,
                        marginBottom: 30,
                        display: "inline-flex",
                        alignSelf: "center",
                    }}>
                    <div
                        style={{
                            display: "inline-block",
                            alignSelf: "center",
                            textAlign: "center",
                        }}>
                        <div className={Styles.subBalancesTitles}>Income</div>
                        <div
                            className={
                                Styles.subBalanceIncome
                            }>{`+ $${totIncome.toFixed(2)}`}</div>
                    </div>
                    <div>
                        <div className={Styles.subBalancesTitles}>Expense</div>
                        <div
                            className={
                                Styles.subBalanceExpense
                            }>{`- $${totExpense.toFixed(2)}`}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return;
    }
}
export default Balance;
