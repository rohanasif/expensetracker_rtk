import { useDispatch } from "react-redux";
import Transaction from "./Transaction";
import { useGetTransactionsQuery } from "../slice/apiSlice";
const Transactions = () => {
  const { data } = useGetTransactionsQuery();
  return data?.map((t, i) => {
    return <Transaction key={i} transaction={t} />;
  });
};
export default Transactions;
