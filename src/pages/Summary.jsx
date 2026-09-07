import { useMemo } from "react";

import { useTheme } from "../context/ThemeContext";
import useTransactions from "../hooks/useTransactions";
import { categories } from "../data/categories";

import "../styles/Summary.css";

function Summary() {
  const { transactions } = useTransactions();
  const { theme, toggleTheme } = useTheme();

  const incomeTotals = useMemo(() => {
    const totals = {};

    categories.income.forEach((category) => {
      totals[category] = 0;
    });

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totals[transaction.category] += Number(
          transaction.amount
        );
      }
    });

    return totals;
  }, [transactions]);

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

  const totalIncome = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "income") {
        return total + Number(transaction.amount);
      }

      return total;
    }, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === "expense") {
        return total + Number(transaction.amount);
      }

      return total;
    }, 0);
  }, [transactions]);

  const balance = totalIncome - totalExpenses;

  function formatAmount(amount) {
    return amount.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
    });
  }

  return (
    <main className="summary-page">
      <header className="summary-header">
        <button
          className="summary-theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          <span className="summary-theme-icon">
            {theme === "light" ? "☾" : "☀"}
          </span>

          <span>
            {theme === "light" ? "DARK" : "LIGHT"}
          </span>
        </button>

        <p className="summary-subtitle">
          THE LITTLE LEDGER
        </p>

        <h1>SUMMARY</h1>
      </header>

      {/* =========================
          FINANCIAL OVERVIEW
      ========================= */}

      <section className="summary-overview">
        <div className="summary-metric">
          <span className="summary-metric-label">
            INCOME
          </span>

          <strong className="summary-income">
            ₱{formatAmount(totalIncome)}
          </strong>
        </div>

        <div className="summary-metric">
          <span className="summary-metric-label">
            EXPENSES
          </span>

          <strong className="summary-expense">
            ₱{formatAmount(totalExpenses)}
          </strong>
        </div>

        <div className="summary-metric">
          <span className="summary-metric-label">
            BALANCE
          </span>

          <strong className="summary-balance">
            ₱{formatAmount(balance)}
          </strong>
        </div>
      </section>

      {/* =========================
          INCOME
      ========================= */}

      <section className="category-section">
        <div className="summary-section-heading">
          <span>◆</span>

          <h2>INCOME</h2>

          <span>◆</span>
        </div>

        <div className="category-list">
          {categories.income.map((category) => {
            const amount = incomeTotals[category];

            const percentage =
              totalIncome > 0
                ? (amount / totalIncome) * 100
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
                    ₱{formatAmount(amount)}
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

      {/* =========================
          EXPENSES
      ========================= */}

      <section className="category-section">
        <div className="summary-section-heading">
          <span>◆</span>

          <h2>EXPENSES</h2>

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
                    ₱{formatAmount(amount)}
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