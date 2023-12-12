import { useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { v4 as uuidv4 } from "uuid";
import { transact } from "../slice/transactionSlice";
import Transactions from "./Transactions";
import {
  useCreateTransactionMutation,
  useGetBalanceQuery,
  useUpdateBalanceMutation,
} from "../slice/apiSlice";

const AddRemove = () => {
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [datetime, setDateTime] = useState("");
  const { data } = useGetBalanceQuery();
  const balance = data?.amount;
  const expenseCategories = [
    "Bills",
    "Car",
    "Clothes",
    "Travel",
    "Food",
    "Shopping",
    "House",
    "Entertainment",
    "Phone",
    "Pets",
    "Other",
  ];
  const incomeCategories = [
    "Business",
    "Investments",
    "Extra income",
    "Deposits",
    "Lottery",
    "Gifts",
    "Salary",
    "Savings",
    "Rental Income",
  ];
  const dispatch = useDispatch();

  const [createTransaction, creationResponse] = useCreateTransactionMutation();
  const [updateBalance, updateResponse] = useUpdateBalanceMutation();

  const handleCreate = () => {
    const id = uuidv4();
    dispatch(transact({ id, type, category, amount, datetime }));
    createTransaction({ id, type, category, amount, datetime });
    updateBalance(
      balance + (type === "income" ? parseFloat(amount) : -parseFloat(amount))
    );
  };

  return (
    <div className="bg-white flex flex-col items-center rounded-md p-4 min-h-[500px] justify-between">
      <h2 className="text-3xl">Expense Tracker</h2>
      <p>Now handle your expense at ease</p>
      <h2 className="text-3xl">Total Balance: Rs. {balance}</h2>
      <hr />
      <div className="w-full flex">
        <FormControl className="w-1/2">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            label="Type"
            onChange={(e) => {
              setType(e.target.value);
              setCategory("");
            }}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="w-1/2">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === "income"
              ? incomeCategories.map((c, i) => {
                  return (
                    <MenuItem key={i} value={c}>
                      {c}
                    </MenuItem>
                  );
                })
              : type === "expense"
              ? expenseCategories.map((e, i) => {
                  return (
                    <MenuItem key={i} value={e}>
                      {e}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </FormControl>
      </div>
      <div className="w-full flex">
        <TextField
          id="outlined-number"
          label="Amount"
          type="number"
          className="w-1/2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="w-1/2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date and Time"
              value={datetime}
              onChange={(newValue) => setDateTime(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Button variant="outlined" fullWidth onClick={() => handleCreate()}>
        Create
      </Button>
      <Transactions />
    </div>
  );
};
export default AddRemove;
