import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ExpenseChart = ({ expenses }: { expenses: any[] }) => {
  const data = expenses.map((e, i) => ({
    name: `Item ${i + 1}`,
    amount: e.amount,
  }));

  return (
    <LineChart width={350} height={200} data={data}>
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis />
      <YAxis />
    </LineChart>
  );
};

export default ExpenseChart;
