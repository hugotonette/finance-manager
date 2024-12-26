/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categories, Expense } from "../common/interfaces";

const graphColors = [
  "#f7eded", // orange-50
  "#ffedd5", // orange-100
  "#fed7aa", // orange-200
  "#fdba74", // orange-300
  "#fb923c", // orange-400
  "#f97316", // orange-500
  "#ea580c", // orange-600
  "#c2410c", // orange-700
  "#9a3412", // orange-800
  "#7c2d12", // orange-900
  "#431407", // orange-950
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
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ea580c"
              fill="url(#colorExp)"
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#16a34a"
              fill="url(#colorInc)"
            />
          </AreaChart>
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
              outerRadius={100}
              innerRadius={55}
              fill="#8884d8"
              label={({ name }) =>
                name.length > 7 ? `${name.slice(0, 7)}...` : `${name}`
              }
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={graphColors[index % graphColors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center w-full text-white">
        <button
          onClick={() =>
            setSelectedChart(selectedChart === "line" ? "pie" : "line")
          }
          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 shadow hover:shadow-inner text-xs font-medium tracking-widest px-3 py-1 rounded"
        >
          {selectedChart === "line" ? "By Category" : "Show Balance"}
        </button>
        <div className="w-fit text-center text-xs font-medium tracking-widest rounded shadow bg-blue-500 dark:bg-blue-600">
          <button
            onClick={() => setViewOption("week")}
            className={`px-3 py-1 rounded-l hover:bg-blue-400 dark:hover:bg-blue-500 hover:shadow-inner ${
              viewOption === "week"
                ? "shadow-inner bg-blue-400 dark:bg-blue-500"
                : ""
            }`}
          >
            week
          </button>
          <button
            onClick={() => setViewOption("month")}
            className={`px-3 py-1 hover:bg-blue-400 dark:hover:bg-blue-500 hover:shadow-inner ${
              viewOption === "month"
                ? "shadow-inner bg-blue-400 dark:bg-blue-500"
                : ""
            }`}
          >
            month
          </button>
          <button
            onClick={() => setViewOption("year")}
            className={`px-3 py-1  hover:bg-blue-400 dark:hover:bg-blue-500 hover:shadow-inner ${
              viewOption === "year"
                ? "shadow-inner bg-blue-400 dark:bg-blue-500"
                : ""
            }`}
          >
            year
          </button>
          <button
            onClick={() => setViewOption("all")}
            className={`px-3 py-1 rounded-r hover:bg-blue-400 dark:hover:bg-blue-500 hover:shadow-inner ${
              viewOption === "all"
                ? "shadow-inner bg-blue-400 dark:bg-blue-500"
                : ""
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
