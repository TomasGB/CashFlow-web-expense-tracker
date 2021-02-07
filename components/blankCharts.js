import React from "react";
import "firebase/auth";
import "firebase/firestore";
import styles from "../styles/Charts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestion,
    faCashRegister,
    faFolder,
    faIceCream,
    faCar,
    faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Pie } from "react-chartjs-2";

export default function BlankChart() {
    const data = {
        labels: ["Work", "Investments", "Others"],
        datasets: [
            {
                data: [0, 0, 0],
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
                        <div>${0}</div>
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
                        <div>${0}</div>
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
                        <div>${0}</div>
                    </div>
                </div>
                <div style={{ marginTop: 15 }}></div>
                <div
                    style={{
                        width: "300px",
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    <Pie data={data} width={400} height={400} />
                </div>
            </div>
            <div className={styles.IncomeTitle}>Expenses</div>
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
                            <div className={styles.TitleText}>Bills</div>
                        </div>
                        <div>${0}</div>
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
                        <div>${0}</div>
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
                        <div>${0}</div>
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
                        <div>${0}</div>
                    </div>
                </div>
                <div style={{ marginTop: 15 }}></div>
                <div
                    style={{
                        width: "300px",
                        justifyContent: "center",
                        alignSelf: "center",
                    }}>
                    <Pie data={data} width={400} height={400} />
                </div>
            </div>
        </div>
    );
}
