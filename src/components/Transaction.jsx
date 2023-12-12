import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  useDeleteTransactionMutation,
  useGetBalanceQuery,
  useUpdateBalanceMutation,
} from "../slice/apiSlice";
import { deleteTransact } from "../slice/transactionSlice";
const Transaction = ({ transaction }) => {
  const [deleteT, response] = useDeleteTransactionMutation();
  const dispatch = useDispatch();
  const { data } = useGetBalanceQuery();
  const balance = data?.amount;
  const [updateBalance, updateResponse] = useUpdateBalanceMutation();
  const handleDelete = (t) => {
    dispatch(deleteTransact(t));
    deleteT(t.id);
    updateBalance(
      balance -
        (t.type === "income" ? parseFloat(t.amount) : -parseFloat(t.amount))
    );
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <MonetizationOnIcon
          sx={
            transaction.type === "expense"
              ? { color: "red" }
              : transaction.type === "income"
              ? { color: "green" }
              : null
          }
        />
        <div className="flex flex-col">
          <p>{transaction.category}</p>
          <span>
            Rs. {transaction.amount} - {transaction.datetime.toString()}
          </span>
        </div>
      </div>
      <DeleteIcon onClick={() => handleDelete(transaction)} />
    </div>
  );
};
export default Transaction;
