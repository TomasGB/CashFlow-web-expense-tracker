import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../services/auth";
import nookies from "nookies";
import { verifyIdToken } from "../services/firebaseAdmin";
import firebaseClient from "../services/firebaseClient";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/AddTransaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Loading from "./loadingPage";
import NavBar from "../components/navbar/navbar";

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
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth();
            let day = today.getDate();
            let hour = today.getHours();
            let minutes = today.getMinutes();

            if (month < 10) {
                month = "0" + (month + 1);
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            let category = "";

            let dateString =
                month + "-" + day + "-" + year + "  " + hour + ":" + minutes;

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
            <main className={styles.container}>
                <Head>
                    <title>Add Transaction | CashFlow</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#4083E6" />
                    <meta
                        name="description"
                        content="Personal finance app, to keep track of your incomes and expenses."
                    />
                </Head>
                <div>
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
                            <option className={styles.Option} value="Income">
                                Income
                            </option>
                            <option className={styles.Option} value="Expense">
                                Expense
                            </option>
                        </select>
                        <label className={styles.formLabel}>Category</label>
                        {state.Type == "Income" ? (
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
                                <option className={styles.Option} value="Work">
                                    Work
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Investments">
                                    Investments
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Others">
                                    Others
                                </option>
                            </select>
                        ) : (
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
                                <option className={styles.Option} value="Food">
                                    Food
                                </option>
                                <option className={styles.Option} value="Bills">
                                    Bills
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Car expenses">
                                    Car expenses
                                </option>
                                <option
                                    className={styles.Option}
                                    value="Others">
                                    Others
                                </option>
                            </select>
                        )}
                        <div
                            className={styles.formBtn}
                            onClick={createTransaction}>
                            <p>Add new transaction</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    } else {
        return <Loading />;
    }
}
export default AddTransaction;
