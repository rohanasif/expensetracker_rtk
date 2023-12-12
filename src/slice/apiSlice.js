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
    getBalance: builder.query({
      query: () => ({
        url: "balance",
        method: "GET",
      }),
    }),
    updateBalance: builder.mutation({
      query: (number) => ({
        url: "balance",
        method: "PUT",
        body: { amount: number },
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
