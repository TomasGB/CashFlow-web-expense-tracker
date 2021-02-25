import React from "react";
import Styles from "../../styles/Balance.module.css";

function BalanceBlank() {
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
                    <h2 className={Styles.totalBalance}>$</h2>
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
                    <div className={Styles.subBalancesTitles}>Income</div>
                    <div className={Styles.subBalanceIncome}>{`+  `}</div>
                </div>
                <div>
                    <div className={Styles.subBalancesTitles}>Expenses</div>
                    <div className={Styles.subBalanceExpense}>{`- `}</div>
                </div>
            </div>
        </div>
    );
}
export default BalanceBlank;
