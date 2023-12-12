import { useGetTransactionsQuery } from "../slice/apiSlice";
const Income = () => {
  const { data } = useGetTransactionsQuery();
  const incomes = data?.filter((d) => d.type === "income");
  return (
    <div className="bg-white flex flex-col items-center rounded-md p-4 min-h-[200px] ">
      <h1>Income</h1>
      <div>
        <p>
          Rs.{" "}
          {incomes?.reduce((total, income) => total + Number(income.amount), 0)}
        </p>
        {incomes?.map((income, i) => {
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
