import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import styles from "../styles/Charts.module.css";
import initFirebase from "../services/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestion,
    faCashRegister,
    faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

export default function IncomeChart() {
    initFirebase();

    let currentUserUID = firebase.auth().currentUser.uid;

    const [income, setIncome] = useState(0);
    const [workIncome, setWorkIncome] = useState(0);
    const [investmensIncome, setinvestmensIncome] = useState(0);
    const [otherIncome, setOtherIncome] = useState(0);

    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(`${currentUserUID}`)
            .collection("transactionsList")
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
                        acumIncome = acumIncome + parseFloat(doc.data().Amount);

                        if (doc.data().Category == "Work") {
                            workIncomeAcum =
                                workIncomeAcum + parseFloat(doc.data().Amount);
                        } else if (doc.data().Category == "Investments") {
                            investmentsIncomeAcum =
                                investmentsIncomeAcum +
                                parseFloat(doc.data().Amount);
                        } else {
                            otherIncomeAcum =
                                otherIncomeAcum + parseFloat(doc.data().Amount);
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
        <div>
            <div
                style={{
                    padding: 10,
                    margin: 5,
                    width: "80%",
                }}>
                <div className={styles.IncomeTitle}>Incomes</div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignSelf: "center",
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
                        <div>${workIncome.toFixed(2)}</div>
                    </div>
                    <div className={styles.Category}>
                        <div
                            style={{
                                alignSelf: "flex-start",
                                color: "#000000",
                                flexDirection: "row",
                            }}>
                            <FontAwesomeIcon
                                icon={faCashRegister}
                                className={styles.Icons}
                            />
                            <div className={styles.TitleText}>Investments</div>
                        </div>
                        <div>${investmensIncome.toFixed(2)}</div>
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
                            <div className={styles.TitleText}>Others</div>
                        </div>
                        <div>${otherIncome.toFixed(2)}</div>
                    </div>
                </div>
                <div style={{ marginTop: 15 }}></div>
            </div>
            <div
                style={{
                    width: "300px",
                    justifyContent: "center",
                    alignSelf: "center",
                }}>
                <Pie data={data} width={400} height={400} />
            </div>
        </div>
    );
}
