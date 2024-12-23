/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import { expensesList } from "../common/mockExpenses";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "[]");

  const [expenses, setExpenses] = useState<any[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses
      ? JSON.parse(savedExpenses)
      : localStorage.setItem("expenses", JSON.stringify(expensesList));
  });

  const handleAddExpense = (expense: any) => {
    const temp = [...expenses, expense];
    setExpenses(temp);
    localStorage.setItem("expenses", JSON.stringify(temp));
  };

  return (
    <>
      <div className="flex flex-col mt-4 gap-4 p-4 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold">
          Welcome, {user.name} {user.surname}
        </h1>
        <h2 className="text-1xl font-bold">Dashboard</h2>
        <ExpenseForm onAdd={handleAddExpense} />
        <ExpenseList expenses={expenses} />
        <ExpenseChart expenses={expenses} />
      </div>
    </>
  );
};

export default Dashboard;
