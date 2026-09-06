import { useMemo } from "react";

import useTransactions from "../hooks/useTransactions";
import { useTheme } from "../context/ThemeContext";
import { categories } from "../data/categories";

import "../styles/Summary.css";

function Summary() {
  const { transactions } = useTransactions();
  const { theme, toggleTheme } = useTheme();

  const expenseTotals = useMemo(() => {
    const totals = {};

    categories.expense.forEach((category) => {
      totals[category] = 0;
    });

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        totals[transaction.category] += Number(
          transaction.amount
        );
      }
    });

    return totals;
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "expense") {
        return total + Number(transaction.amount);
      }

      return total;
    }, 0);
  }, [transactions]);

  const highestCategory = useMemo(() => {
    return Object.entries(expenseTotals).reduce(
      (highest, current) => {
        if (current[1] > highest[1]) {
          return current;
        }

        return highest;
      },
      ["None", 0]
    );
  }, [expenseTotals]);

  return (
    <main className="summary-page">

      <header className="summary-header">

        <p className="summary-subtitle">
          THE LITTLE LEDGER
        </p>

        <h1>SUMMARY</h1>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "light"
            ? "DARK MODE"
            : "LIGHT MODE"}
        </button>

      </header>


      <section className="summary-overview">

        <p className="summary-label">
          TOTAL EXPENSES
        </p>

        <p className="summary-total">
          ₱
          {totalExpenses.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </p>

        <div className="summary-highest">
          <span>HIGHEST CATEGORY</span>

          <strong>
            {highestCategory[0]}
          </strong>
        </div>

      </section>


      <section className="category-section">

        <div className="summary-section-heading">
          <span>◆</span>

          <h2>SPENDING BY CATEGORY</h2>

          <span>◆</span>
        </div>


        <div className="category-list">

          {categories.expense.map((category) => {
            const amount = expenseTotals[category];

            const percentage =
              totalExpenses > 0
                ? (amount / totalExpenses) * 100
                : 0;

            return (
              <div
                className="category-row"
                key={category}
              >

                <div className="category-info">

                  <span className="category-name">
                    {category}
                  </span>

                  <span className="category-amount">
                    ₱
                    {amount.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </span>

                </div>

                <div className="category-bar">

                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </section>

    </main>
  );
}

export default Summary;