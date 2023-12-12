import { useSelector } from "react-redux";
import {} from "../slice/apiSlice";
const Income = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const incomes = transactions.filter((t) => t.type === "income");
  return (
    <div className="bg-white flex flex-col items-center rounded-md p-4 min-h-[200px] ">
      <h1>Income</h1>
      <div>
        <p>
          Rs.{" "}
          {incomes?.reduce((total, income) => total + Number(income.amount), 0)}
        </p>
        {incomes.map((income, i) => {
          return (
            <div className="flex justify-around" key={i}>
              <p>
                {income.category}: Rs. {income.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Income;
