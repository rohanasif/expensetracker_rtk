import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  tagTypes: ["transactions"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => ({
        url: "transactions",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    getTransactionById: builder.query({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "GET",
      }),
    }),
    getBalance: builder.query({
      query: () => ({
        url: "balance",
        method: "GET",
      }),
    }),
    updateBalance: builder.mutation({
      query: (balance) => ({
        url: "balance",
        method: "PATCH",
        body: { balance: balance.amount },
      }),
      invalidatesTags: ["transactions"],
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: "transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetBalanceQuery,
  useUpdateBalanceMutation,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = expenseApi;
