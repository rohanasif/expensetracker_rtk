import { useSelector } from "react-redux";
const Expenses = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const expenses = transactions.filter((t) => t.type === "expense");
  return (
    <div className="bg-white flex flex-col items-center rounded-md p-4 min-h-[200px] ">
      <h1>Expenses</h1>
      <p>
        Rs.{" "}
        {expenses.reduce((total, expense) => total + Number(expense.amount), 0)}
      </p>
      {expenses.map((expense, i) => {
        return (
          <div className="flex justify-around" key={i}>
            <p>
              {expense.category}: Rs. {expense.amount}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Expenses;
