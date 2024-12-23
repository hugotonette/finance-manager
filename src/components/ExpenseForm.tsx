/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { categories } from "../common/interfaces";

const ExpenseForm = ({ onAdd }: { onAdd: (expense: any) => void }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount) {
      onAdd({
        amount: parseFloat(amount),
        categories,
        type,
        date: new Date(),
      });
      setAmount("");
      setCategory("");
      setType("");
    } else {
      alert("Error");
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xs w-9/12 justify-center items-center"
      >
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 bg-transparent border-2 rounded-lg border-gray-800 dark:border-gray-100"
        />
        <select
          value={type === "income" ? "99" : category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={type === "income"}
          className="w-full p-2 bg-transparent border-2 rounded-lg border-gray-800 dark:border-gray-100"
        >
          <option key="0" value="" className="text-black">
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 bg-transparent border-2 rounded-lg border-gray-800 dark:border-gray-100"
        >
          <option value="expense" className="text-black">
            Expense
          </option>
          <option value="income" className="text-black">
            Income
          </option>
        </select>
        <button
          type="submit"
          className="rounded-md bg-green-500 text-white py-2 px-4"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
