import React, { useState, useEffect } from "react";
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
                        <b
                            style={{
                                display: "block",
                                textAlign: "center",
                                justifyContent: "center",
                                fontSize: 24,
                            }}>
                            Your Balance
                        </b>
                        <h2
                            style={{
                                display: "block",
                                textAlign: "center",
                            }}>
                            $ {balance}
                        </h2>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        display: "inline-flex",
                        alignSelf: "center",
                    }}>
                    <div
                        style={{
                            display: "inline-block",
                            alignSelf: "center",
                            textAlign: "center",
                        }}>
                        <div
                            style={{
                                fontSize: 18,
                                marginLeft: 15,
                                marginRight: 15,
                                color: "grey",
                            }}>
                            Income
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                color: "green",
                            }}>{`+ ${totIncome}`}</div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 18,
                                marginLeft: 15,
                                marginRight: 15,
                                color: "grey",
                            }}>
                            Expenses
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                color: "red",
                                alignSelf: "center",
                                textAlign: "center",
                            }}>{`- ${totExpense}`}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return;
    }
}
export default Balance;
