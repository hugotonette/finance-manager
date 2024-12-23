export interface User {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
}

export interface Expense {
  id: number;
  type: "income" | "expense";
  categoryId: number;
  amount: number;
  date: string;
  user: string;
}

export const categories = [
  { id: 1, name: "Restaurant" },
  { id: 2, name: "Groceries" },
  { id: 3, name: "Transportation" },
  { id: 4, name: "Rent" },
  { id: 5, name: "Bills" },
  { id: 6, name: "Travel" },
  { id: 7, name: "Transfers" },
  { id: 8, name: "Shopping" },
  { id: 9, name: "Entertainment" },
  { id: 99, name: "-" },
];
