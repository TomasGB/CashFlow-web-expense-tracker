# CashFlow

Personal Finance tracker Web App, to keep track of money transactions and see basic analytics. The frontend was made with React and Next.js and the backend with Firebase (Auth and Firestore).

## How to use:

-   Open up command prompt / terminal.
-   Clone this repository.
-   Run  `npm install` to install the dependencies.
-   Inside the `services/` directory remove 'sample' from `firebaseAdminSample.js` and `firebaseClientSample.js`.
-   Modify `firebaseConfig` inside `firebaseAdmin.js` with your own Firebase app keys. 
-   Run ```npm run dev``` to run the development server.
-   On your browser go to `http://localhost:3000/`.

## Project structure:
- `components/`
  - Inside this directory are all the app components separated by folder, each folder contains one main component and a blank component.
- `pages/`
  - Inside this directory are all the frontend pages.
- `services/`
  - Inside this directory are all Firebase related files (authentication and firestore)
- `styles/`
  - Inside this directory are all pages and components CSS files.

## Database Structure:
```
Users
  |
  └ User UID
        |
        └ User Data (Email, Name, Password, UID)
        |
        └ TransactionList (TransactionsID)
                |
                └ Transactions Data (Amount, Category, DateString, Description, Type, dateID)
```


