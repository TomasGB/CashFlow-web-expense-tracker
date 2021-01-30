import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from "next/router";
import Head from "next/head";
import styles from "../styles/signup.module.css";
import initFirebase from "../services/firebase";

function AddTransaction() {
    initFirebase();

    let currentUserUID = firebase.auth().currentUser.uid;

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

        if (state.Description == "" || state.Amount == "" || state.Type == "") {
            alert("Complete all fields with a * .");
        } else {
            const db = firebase.firestore();

            await db
                .collection("users")
                .doc(`${currentUserUID}`)
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
            <div style={{ display: "flex", marginLeft: "25px" }}>
                <button
                    type="submit"
                    className={styles.formBtn}
                    onClick={() => {
                        Router.push("/dashboard");
                    }}>
                    back
                </button>
            </div>
            <body id="body">
                <h1 className={styles.title}>Add a new transaction</h1>
                <div className={styles.Form}>
                    <label className={styles.formLabel}>Description</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Description"
                        name="Name"
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
                            setState({ ...state, Amount: value.target.value })
                        }
                        required></input>
                    <label className={styles.formLabel}>Type</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Income / Expense"
                        onChange={(value) =>
                            setState({ ...state, Type: value.target.value })
                        }
                        required></input>
                    <label className={styles.formLabel}>Category</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Category"
                        onChange={(value) =>
                            setState({ ...state, Category: value.target.value })
                        }
                        required></input>
                    <button
                        type="submit"
                        className={styles.formBtn}
                        onClick={createTransaction}>
                        +
                    </button>
                </div>
            </body>
        </div>
    );
}
export default AddTransaction;
