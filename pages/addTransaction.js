import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../services/auth";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import firebaseClient from "../services/firebaseClient";
import TransactionListBlank from "../components/transactionListBlank";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/AddTransaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.token);
        const { uid, email } = token;
        return {
            props: { session: `email: ${email}, uid: ${uid}` },
        };
    } catch (error) {
        console.log(error);
        return { props: [] };
    }
}

function AddTransaction({ session }) {
    const { user } = useAuth();
    firebaseClient();

    if (user != null) {
        const [state, setState] = useState({
            Description: "",
            Amount: "",
            Type: "",
            dateId: "",
            DateString: "",
            Category: "",
        });
        console.log(state);
        const createTransaction = async () => {
            let date = Date.now();
            let category = "";
            let today = new Date();
            let dateString =
                today.getMonth() +
                1 +
                "-" +
                today.getDate() +
                "-" +
                today.getFullYear() +
                "  " +
                today.getHours() +
                ":" +
                today.getMinutes();

            if (state.Category == "") {
                category = "Others";
            } else {
                category = state.Category;
            }

            if (
                state.Description == "" ||
                state.Amount == "" ||
                state.Type == ""
            ) {
                alert("Complete all fields with a * .");
            } else {
                const db = firebase.firestore();

                await db
                    .collection("users")
                    .doc(user.uid)
                    .collection("transactionsList")
                    .add({
                        Description: state.Description,
                        Amount: state.Amount,
                        Type: state.Type,
                        dateId: date,
                        DateString: dateString,
                        Category: category,
                    });
                alert("New transaction added.");
                Router.push("/dashboard");
            }
        };

        return (
            <div className={styles.container}>
                <Head>
                    <title>Add Transaction | CashFlow</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div
                    style={{
                        display: "flex",
                        marginTop: "20px",
                        marginLeft: "25px",
                    }}
                    onClick={() => {
                        Router.push("/dashboard");
                    }}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={styles.BackBtn}
                    />
                    <p
                        style={{
                            color: "#fff",
                            marginLeft: "15px",
                            fontWeight: 700,
                            fontSize: 18,
                        }}>
                        Back
                    </p>
                </div>
                <div id="body">
                    <h1 className={styles.title}>Add a new transaction</h1>
                    <div className={styles.Form}>
                        <label className={styles.formLabel}>Description</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            placeholder="Description"
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Description: value.target.value,
                                })
                            }
                            required></input>
                        <label className={styles.formLabel}>Amount</label>
                        <input
                            className={styles.formInput}
                            type="text"
                            placeholder="Amount"
                            name="numeric"
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Amount: value.target.value,
                                })
                            }
                            required></input>
                        <label className={styles.formLabel}>Type</label>
                        <select
                            className={styles.formInput}
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Type: value.target.value,
                                })
                            }>
                            <option selected disabled hidden>
                                Choose type
                            </option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                        <label className={styles.formLabel}>Category</label>
                        <select
                            className={styles.formInput}
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    Category: value.target.value,
                                })
                            }>
                            <option selected disabled hidden>
                                Choose a category
                            </option>
                            <option value="Others">Others</option>
                            <option value="Food">Food</option>
                            <option value="Bills">Bills</option>
                            <option value="Car expenses">Car expenses</option>
                            <option value="Work">Work</option>
                            <option value="Investments">Investments</option>
                        </select>
                        <div
                            className={styles.formBtn}
                            onClick={createTransaction}>
                            <FontAwesomeIcon icon={faPlus} width={"15px"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}
export default AddTransaction;
