import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTransact } from "../slice/transactionSlice";

const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();
  const handleDelete = (t) => {
    dispatch(deleteTransact(t));
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
