import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  balance: { amount: 0 },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transact: (state, action) =>
      action.payload.type === "expense"
        ? {
            ...state,
            transactions: [...state.transactions, action.payload],
            balance: {
              ...state.balance,
              amount: state.balance.amount - Number(action.payload.amount),
            },
          }
        : action.payload.type === "income"
        ? {
            ...state,
            transactions: [...state.transactions, action.payload],
            balance: {
              ...state.balance,
              amount: state.balance.amount + Number(action.payload.amount),
            },
          }
        : state,
    deleteTransact: (state, action) =>
      action.payload.type === "expense"
        ? {
            ...state,
            transactions: state.transactions.filter(
              (t) => t.id !== action.payload.id
            ),
            balance: {
              amount: state.balance.amount + Number(action.payload.amount),
            },
          }
        : action.payload.type === "income"
        ? {
            ...state,
            transactions: state.transactions.filter(
              (t) => t.id !== action.payload.id
            ),
            balance: {
              amount: state.balance.amount - Number(action.payload.amount),
            },
          }
        : state,
  },
});

export const { transact, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
