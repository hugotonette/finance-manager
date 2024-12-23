/* eslint-disable @typescript-eslint/no-explicit-any */
import { categories, Expense } from "../common/interfaces";

const groupExpensesByDate = () => {
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

  const groupedExpenses = expenses.reduce((acc: any, expense: any) => {
    const dateKey = new Date(expense.date).toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  Object.keys(groupedExpenses).forEach((date) => {
    groupedExpenses[date].sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return groupedExpenses;
};

const ExpenseList = () => {
  const groupedExpenses = groupExpensesByDate();
  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <>
      <div className="mt-4">
        {sortedDates.map((date) => (
          <div key={date} className="text-gray-500 dark:text-gray-400">
            <div className="my-4 pt-4  text-center text-lg font-bold text-gray-400 dark:text-gray-500">
              <span>{date}</span>
            </div>
            {groupedExpenses[date].map((expense: any) => (
              <div
                key={expense.id}
                className="flex flex-col border-t py-6 px-2 border-gray-300 dark:border-gray-500"
              >
                {expense.type === "income" ? (
                  <div className="p-2 flex flex-col justify-end items-end gap-2">
                    <div className="flex flex-row gap-5 text-green-500">
                      <p className="text-xl">€{expense.amount}</p>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                        <path d="M18 12l.01 0" />
                        <path d="M6 12l.01 0" />
                      </svg>
                    </div>
                    <div className="flex flex-row gap-5 justify-end align-middle">
                      <p className="font-mono text-sm mt-auto mb-0">
                        {new Date(expense.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                      <p className="font-medium">Income</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 flex flex-col justify-start items-start gap-2">
                    <div className="flex flex-row gap-5 text-red-500">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9.88 9.878a3 3 0 1 0 4.242 4.243m.58 -3.425a3.012 3.012 0 0 0 -1.412 -1.405" />
                        <path d="M10 6h9a2 2 0 0 1 2 2v8c0 .294 -.064 .574 -.178 .825m-2.822 1.175h-13a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h1" />
                        <path d="M18 12l.01 0" />
                        <path d="M6 12l.01 0" />
                        <path d="M3 3l18 18" />
                      </svg>
                      <p className="text-xl">- €{expense.amount}</p>
                    </div>
                    <div className="flex flex-row gap-5">
                      <p className="font-medium">
                        {categories.find(
                          (elem) => elem.id === expense.categoryId
                        )?.name || "Others"}
                      </p>
                      <p className="font-mono text-sm mt-auto mb-0">
                        {new Date(expense.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpenseList;
