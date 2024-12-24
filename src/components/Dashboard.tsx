/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import { expensesList } from "../common/mockExpenses";
import BottomOverlay from "./BottomOverlay";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "[]");
  const isLoggedIn = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [expenses, setExpenses] = useState<any[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return isLoggedIn
      ? savedExpenses
        ? JSON.parse(savedExpenses)
        : localStorage.setItem("expenses", JSON.stringify(expensesList))
      : [];
  });

  const handleAddExpense = (expense: any) => {
    const temp = [...expenses, expense];
    setExpenses(temp);
    localStorage.setItem("expenses", JSON.stringify(temp));
  };

  return (
    <>
      <div className="flex flex-col mt-4 gap-4 p-4 max-w-lg text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold">
          Welcome, {user.name} {user.surname}
        </h1>
        <ExpenseChart />
        <ExpenseList />
      </div>

      {/* floating button */}
      <button
        onClick={() => setOverlayOpen(true)}
        className="fixed bottom-5 right-5 p-4 font-black text-white rounded-full shadow-lg bg-green-500"
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </button>

      <BottomOverlay
        overlayOpen={overlayOpen}
        setOverlayOpen={setOverlayOpen}
        content={
          <ExpenseForm
            onAdd={handleAddExpense}
            setOverlayOpen={setOverlayOpen}
          />
        }
      />
    </>
  );
};

export default Dashboard;
