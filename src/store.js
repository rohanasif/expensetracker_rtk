import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./slice/transactionSlice";
import { expenseApi } from "./slice/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
const store = configureStore({
  reducer: {
    transactions: transactionSlice,
    [expenseApi.reducerPath]: expenseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenseApi.middleware),
});

setupListeners(store.dispatch);
export default store;
