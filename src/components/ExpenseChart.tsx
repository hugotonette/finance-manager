/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categories, Expense } from "../common/interfaces";

const graphColors = [
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
  "#f97316",
  "#84cc16",
];

const ExpenseChart = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [selectedChart, setSelectedChart] = useState<"line" | "pie">("line");
  const [viewOption, setViewOption] = useState<
    "week" | "month" | "year" | "all"
  >("all");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [activeUser, setActiveUser] = useState<string>("");

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const user = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    ).username;

    setExpenseData(storedExpenses);
    setActiveUser(user);

    setFilteredExpenses(
      storedExpenses.filter((expense: any) => expense.user === user)
    );
  }, []);

  const filterExpenses = (expenses: Expense[]) => {
    const now = new Date();

    let filteredData = expenses.filter(
      (expense) => expense.user === activeUser
    );

    if (viewOption === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) >= startOfWeek
      );
    } else if (viewOption === "month") {
      const startOfMonth = new Date(now);
      startOfMonth.setMonth(now.getMonth() - 1);
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) >= startOfMonth
      );
    } else if (viewOption === "year") {
      const startOfYear = new Date(now);
      startOfYear.setFullYear(now.getFullYear() - 1);
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) >= startOfYear
      );
    }

    setFilteredExpenses(filteredData);
  };

  useEffect(() => {
    filterExpenses(expenseData);
  }, [viewOption, expenseData, activeUser]);

  const groupByDate = (
    expenses: Expense[],
    period: "day" | "month" | "year"
  ) => {
    const groupedData: any = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      let dateKey: string;
      if (period === "day") dateKey = date.toLocaleDateString();
      else if (period === "month")
        dateKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
      else dateKey = `${date.getFullYear()}`;

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { income: 0, expense: 0 };
      }

      if (expense.type === "income")
        groupedData[dateKey].income += expense.amount;
      else groupedData[dateKey].expense += expense.amount;
    });

    return Object.entries(groupedData).map(([key, value]: any) => ({
      date: key,
      income: value.income,
      expense: value.expense,
    }));
  };

  const getCategoryData = (expenses: Expense[]) => {
    const categoryTotals: { [key: number]: number } = {};

    expenses
      .filter((expense) => expense.type === "expense")
      .forEach((expense) => {
        if (!categoryTotals[expense.categoryId]) {
          categoryTotals[expense.categoryId] = 0;
        }
        categoryTotals[expense.categoryId] += expense.amount;
      });

    return Object.entries(categoryTotals).map(([categoryId, totalAmount]) => {
      const category = categories.find(
        (cat) => cat.id === parseInt(categoryId)
      );
      return {
        name: category?.name || "Others",
        value: totalAmount,
      };
    });
  };

  const renderChart = () => {
    if (selectedChart === "line") {
      const data = groupByDate(filteredExpenses, "day");

      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Change line color for income to Tailwind green-500 (#22c55e) */}
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />
            <Line type="monotone" dataKey="income" stroke="#22c55e" />{" "}
            {/* Tailwind Green-500 */}
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (selectedChart === "pie") {
      const data = getCategoryData(filteredExpenses);

      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={graphColors[index % graphColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `€${value.toFixed(2)}`}
              labelFormatter={(name: string) => name}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center w-full">
        <div>
          <button
            onClick={() =>
              setSelectedChart(selectedChart === "line" ? "pie" : "line")
            }
            className="bg-blue-500 text-sm font-medium px-2 rounded shadow"
          >
            {selectedChart === "line" ? "By Category" : "Show Balance"}
          </button>
        </div>
        <div className="w-fit text-center text-sm drop-shadow-2xl font-medium border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setViewOption("week")}
            className={`border-r-2 border-inherit px-3 rounded-l ${
              viewOption === "week"
                ? "shadow-inner bg-green-700"
                : "bg-green-500"
            }`}
          >
            week
          </button>
          <button
            onClick={() => setViewOption("month")}
            className={`border-r-2 border-inherit px-3 ${
              viewOption === "month"
                ? "shadow-inner bg-green-700"
                : " bg-green-500"
            }`}
          >
            month
          </button>
          <button
            onClick={() => setViewOption("year")}
            className={`border-r-2 border-inherit px-3 ${
              viewOption === "year"
                ? "shadow-inner bg-green-700"
                : " bg-green-500"
            }`}
          >
            year
          </button>
          <button
            onClick={() => setViewOption("all")}
            className={`px-3 rounded-r ${
              viewOption === "all"
                ? "shadow-inner bg-green-700"
                : " bg-green-500"
            }`}
          >
            all
          </button>
        </div>
      </div>

      {renderChart()}
    </div>
  );
};

export default ExpenseChart;
