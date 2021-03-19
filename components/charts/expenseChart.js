import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import styles from "../../styles/Charts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestion,
    faIceCream,
    faCar,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

export default function ExpenseChart(props) {
    if (props.uid != null) {
        const [Expense, setExpense] = useState(0);
        const [billsExpense, setBillsExpense] = useState(0);
        const [foodExpense, setFoodExpense] = useState(0);
        const [carExpense, setCarExpense] = useState(0);
        const [otherExpense, setOtherExpense] = useState(0);

        useEffect(() => {
            firebase
                .firestore()
                .collection("users")
                .doc(props.uid)
                .collection("transactionsList")
                .orderBy("dateId", "desc")
                .onSnapshot((querySnapshot) => {
                    let acumExpense = 0;
                    let billsExpenseAcum = 0;
                    let foodExpenseAcum = 0;
                    let carExpenseAcum = 0;
                    let otherExpenseAcum = 0;

                    querySnapshot.docs.forEach((doc) => {
                        if (
                            (doc.data().Type == "expense") |
                            (doc.data().Type == "Expense")
                        ) {
                            acumExpense =
                                acumExpense + parseFloat(doc.data().Amount);

                            if (doc.data().Category == "Bills") {
                                billsExpenseAcum =
                                    billsExpenseAcum +
                                    parseFloat(doc.data().Amount);
                            } else if (doc.data().Category == "Food") {
                                foodExpenseAcum =
                                    foodExpenseAcum +
                                    parseFloat(doc.data().Amount);
                            } else if (doc.data().Category == "Car expenses") {
                                carExpenseAcum =
                                    carExpenseAcum +
                                    parseFloat(doc.data().Amount);
                            } else {
                                otherExpenseAcum =
                                    otherExpenseAcum +
                                    parseFloat(doc.data().Amount);
                            }
                        }
                    });
                    setExpense(acumExpense);
                    setBillsExpense(billsExpenseAcum);
                    setFoodExpense(foodExpenseAcum);
                    setCarExpense(carExpenseAcum);
                    setOtherExpense(otherExpenseAcum);
                });
        }, []);

        const data = {
            labels: ["Bills", "Food", "Car", "Others"],
            datasets: [
                {
                    data: [billsExpense, foodExpense, carExpense, otherExpense],
                    backgroundColor: [
                        "rgba(5, 5, 220,0.7)",
                        "rgba(57, 57, 249,0.7)",
                        "rgba(60, 98, 175,0.4)",
                        "rgba(86, 64, 167,0.7)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(5, 5, 220,0.7)",
                        "rgba(57, 57, 249,0.7)",
                        "rgba(60, 98, 175,0.4)",
                        "rgba(86, 64, 167,0.7)",
                    ],
                },
            ],
        };

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "50px",
                }}>
                <div className={styles.IncomeTitle}>Expenses</div>
                {props.summary == false ? (
                    <div
                        style={{
                            padding: 10,
                            marginTop: 25,
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                        }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignSelf: "center",
                                width: "40%",
                                marginBottom: "5%",
                            }}>
                            <div className={styles.Category}>
                                <div
                                    style={{
                                        alignSelf: "flex-start",
                                        color: "#000000",
                                        flexDirection: "row",
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faFileAlt}
                                        className={styles.Icons}
                                    />
                                    <div className={styles.TitleText}>
                                        Bills
                                    </div>
                                </div>
                                <div className={styles.Text}>
                                    ${billsExpense.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (billsExpense.toFixed(2) / Expense) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                            <div className={styles.Category}>
                                <div
                                    style={{
                                        alignSelf: "flex-start",
                                        color: "#000000",
                                        flexDirection: "row",
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faIceCream}
                                        className={styles.Icons}
                                    />
                                    <div className={styles.TitleText}>Food</div>
                                </div>
                                <div className={styles.Text}>
                                    ${foodExpense.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (foodExpense.toFixed(2) / Expense) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                            <div className={styles.Category}>
                                <div
                                    style={{
                                        alignSelf: "flex-start",
                                        color: "#000000",
                                        flexDirection: "row",
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faCar}
                                        className={styles.Icons}
                                    />
                                    <div className={styles.TitleText}>Car</div>
                                </div>
                                <div className={styles.Text}>
                                    ${carExpense.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (carExpense.toFixed(2) / Expense) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                            <div className={styles.Category}>
                                <div
                                    style={{
                                        alignSelf: "flex-start",
                                        color: "#000000",
                                        flexDirection: "row",
                                    }}>
                                    <FontAwesomeIcon
                                        icon={faQuestion}
                                        className={styles.Icons}
                                    />
                                    <div className={styles.TitleText}>
                                        Others
                                    </div>
                                </div>
                                <div className={styles.Text}>
                                    ${otherExpense.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (otherExpense.toFixed(2) / Expense) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 15 }}></div>
                        <div className={styles.chartArea}>
                            <Pie data={data} width={400} height={400} />
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            padding: 10,
                            marginTop: 25,
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}>
                        <div style={{ marginTop: 15 }}></div>
                        <div className={styles.chartArea}>
                            <Pie data={data} width={400} height={400} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
