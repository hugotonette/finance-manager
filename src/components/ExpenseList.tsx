/* eslint-disable @typescript-eslint/no-explicit-any */
const ExpenseList = ({ expenses }: { expenses: any[] }) => {
  return (
    <>
      <div className="mt-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="border-b p-2">
            <p>Amount: ${expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Type: {expense.type}</p>
            <p>Date: {expense.date.toString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpenseList;
