import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import CatOffice from "../components/CatOffice";
import LedgerEntry from "../components/LedgerEntry";

import useTransactions from "../hooks/useTransactions";
import { categories } from "../data/categories";

import "../styles/Dashboard.css";

function Dashboard() {
  const { transactions } = useTransactions();
  const { theme, toggleTheme } = useTheme();

  const [typeFilter, setTypeFilter] = useState("all");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const latestTransaction = transactions[0];

  const balance = useMemo(() => {
    return transactions.reduce(
      (total, transaction) => {
        if (transaction.type === "income") {
          return total + Number(transaction.amount);
        }

        return total - Number(transaction.amount);
      },
      0
    );
  }, [transactions]);

  const availableCategories = useMemo(() => {
    if (typeFilter === "income") {
      return categories.income;
    }

    if (typeFilter === "expense") {
      return categories.expense;
    }

    return [
      ...new Set([
        ...categories.income,
        ...categories.expense,
      ]),
    ];
  }, [typeFilter]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category === categoryFilter;

      return matchesType && matchesCategory;
    });
  }, [
    transactions,
    typeFilter,
    categoryFilter,
  ]);

  function handleTypeFilter(type) {
    setTypeFilter(type);
    setCategoryFilter("all");
  }

  function handleCategoryFilter(event) {
    setCategoryFilter(event.target.value);
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <button
          className="dashboard-theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          <span className="theme-icon">
            {theme === "light" ? "☾" : "☀"}
          </span>

          <span>
            {theme === "light" ? "DARK" : "LIGHT"}
          </span>
        </button>

        <p className="dashboard-subtitle">
          PERSONAL BUDGET TRACKER
        </p>

        <h1>THE LITTLE LEDGER</h1>

        <CatOffice />
      </header>

      <section className="latest-section">
        <div className="section-heading">
          <span className="heading-decoration">
            ◆
          </span>

          <h2>LATEST ENTRY</h2>

          <span className="heading-decoration">
            ◆
          </span>
        </div>

        {latestTransaction ? (
          <Link
            to={`/transaction/${latestTransaction.id}`}
            className="latest-entry"
          >
            <div className="entry-info">
              <p className="entry-title">
                {latestTransaction.title}
              </p>

              <p className="entry-meta">
                {latestTransaction.category} ·{" "}
                {latestTransaction.date}
              </p>
            </div>

            <p className="entry-amount">
              {latestTransaction.type === "income"
                ? "+"
                : "-"}
              ₱
              {Number(
                latestTransaction.amount
              ).toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}
            </p>
          </Link>
        ) : (
          <div className="latest-entry">
            <div className="entry-info">
              <p className="entry-title">
                No transactions yet
              </p>

              <p className="entry-meta">
                ---
              </p>
            </div>

            <p className="entry-amount">
              ₱0.00
            </p>
          </div>
        )}
      </section>

      <section className="balance-section">
        <p className="balance-label">
          CURRENT BALANCE
        </p>

        <div className="balance-display">
          <span>₱</span>

          <strong>
            {balance.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </strong>
        </div>
      </section>

      <section className="ledger-section">
        <div className="section-heading">
          <span className="heading-decoration">
            ◆
          </span>

          <h2>LEDGER</h2>

          <span className="heading-decoration">
            ◆
          </span>
        </div>

        <div className="ledger-controls">
          <div className="type-filters">
            <button
              className={
                typeFilter === "all"
                  ? "filter-active"
                  : ""
              }
              onClick={() => handleTypeFilter("all")}
            >
              ALL
            </button>

            <button
              className={
                typeFilter === "income"
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                handleTypeFilter("income")
              }
            >
              INCOME
            </button>

            <button
              className={
                typeFilter === "expense"
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                handleTypeFilter("expense")
              }
            >
              EXPENSE
            </button>
          </div>

          <select
            className="category-filter"
            value={categoryFilter}
            onChange={handleCategoryFilter}
          >
            <option value="all">
              ALL CATEGORIES
            </option>

            {availableCategories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="ledger-list">
          {filteredTransactions.length === 0 ? (
            <div className="ledger-empty">
              <span className="empty-icon">
                ◇
              </span>

              <p>
                NO MATCHING TRANSACTIONS
              </p>

              <span className="empty-icon">
                ◇
              </span>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <LedgerEntry
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;