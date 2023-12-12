import { useSelector } from "react-redux";
import Transaction from "./Transaction";
const Transactions = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  return transactions.map((t, i) => {
    return <Transaction key={i} transaction={t} />;
  });
};
export default Transactions;
