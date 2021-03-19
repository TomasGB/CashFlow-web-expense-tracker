import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import styles from "../../styles/Charts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestion,
    faMoneyBillWave,
    faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

export default function IncomeChart(props) {
    if (props.uid != null) {
        const [income, setIncome] = useState(0);
        const [workIncome, setWorkIncome] = useState(0);
        const [investmensIncome, setinvestmensIncome] = useState(0);
        const [otherIncome, setOtherIncome] = useState(0);

        useEffect(() => {
            const db = firebase.firestore().collection("users").doc(props.uid);

            db.collection("transactionsList")
                .orderBy("dateId", "desc")
                .onSnapshot((querySnapshot) => {
                    let acumIncome = 0;
                    let workIncomeAcum = 0;
                    let investmentsIncomeAcum = 0;
                    let otherIncomeAcum = 0;

                    querySnapshot.docs.forEach((doc) => {
                        if (
                            (doc.data().Type == "income") |
                            (doc.data().Type == "Income")
                        ) {
                            acumIncome =
                                acumIncome + parseFloat(doc.data().Amount);

                            if (doc.data().Category == "Work") {
                                workIncomeAcum =
                                    workIncomeAcum +
                                    parseFloat(doc.data().Amount);
                            } else if (doc.data().Category == "Investments") {
                                investmentsIncomeAcum =
                                    investmentsIncomeAcum +
                                    parseFloat(doc.data().Amount);
                            } else {
                                otherIncomeAcum =
                                    otherIncomeAcum +
                                    parseFloat(doc.data().Amount);
                            }
                        }
                    });
                    setIncome(acumIncome);
                    setWorkIncome(workIncomeAcum);
                    setinvestmensIncome(investmentsIncomeAcum);
                    setOtherIncome(otherIncomeAcum);
                });
        }, []);

        const data = {
            labels: ["Work", "Investments", "Others"],
            datasets: [
                {
                    data: [workIncome, investmensIncome, otherIncome],
                    backgroundColor: [
                        "rgba(57, 57, 249,0.5)",
                        "rgba(5, 5, 220,0.7)",
                        "rgba(86, 64, 167,0.3)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(57, 57, 249,0.5)",
                        "rgba(5, 5, 220,0.7)",
                        "rgba(86, 64, 167,0.3)",
                    ],
                },
            ],
        };

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={styles.IncomeTitle}>Incomes</div>
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
                                        icon={faFolder}
                                        className={styles.Icons}
                                    />
                                    <div className={styles.TitleText}>Work</div>
                                </div>
                                <div className={styles.Text}>
                                    ${workIncome.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (workIncome.toFixed(2) / income) *
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
                                        icon={faMoneyBillWave}
                                        className={styles.Icons}
                                    />
                                    <div className={styles.TitleText}>
                                        Investments
                                    </div>
                                </div>
                                <div className={styles.Text}>
                                    ${investmensIncome.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (investmensIncome.toFixed(2) / income) *
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
                                    ${otherIncome.toFixed(2)}
                                </div>
                                <div className={styles.Text}>
                                    {(
                                        (otherIncome.toFixed(2) / income) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 15 }}></div>
                        <div className={styles.chartArea}>
                            <Pie data={data} width={300} height={300} />
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
                            <Pie data={data} width={300} height={300} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
