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
        date: new Date().toDateString(),
      });
      setAmount("");
      setCategory("");
      setType("");
    } else {
      alert("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2"
      >
        <option key="0" value="" className="">
          Select a category
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit" className="bg-green-500 text-white py-2 px-4">
        Add
      </button>
    </form>
  );
};

export default ExpenseForm;
