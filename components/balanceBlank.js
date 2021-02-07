import React, { useState, useEffect } from "react";

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
                        $
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
                        }}>{`+  `}</div>
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
                        }}>{`- `}</div>
                </div>
            </div>
        </div>
    );
}
export default BalanceBlank;
