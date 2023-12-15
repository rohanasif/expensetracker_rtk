import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  tagTypes: ["transactions", "balance"],
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
    getBalance: builder.query({
      query: () => ({
        url: "balance",
        method: "GET",
      }),
      providesTags: ["balance"],
    }),
    updateBalance: builder.mutation({
      query: (number) => ({
        url: "balance",
        method: "PUT",
        body: { amount: number },
      }),
      invalidatesTags: ["transacations", "balance"],
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: "transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["transactions", "balance"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions", "balance"],
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
