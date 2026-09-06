import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useTransactions from "../hooks/useTransactions";
import { categories } from "../data/categories";

import "../styles/AddTransaction.css";

const initialForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "Food",
  date: "",
  description: "",
};

function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError("");
  }

  function handleTypeChange(event) {
    const type = event.target.value;

    setForm((currentForm) => ({
      ...currentForm,
      type,
      category: categories[type][0],
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a transaction title.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError("Please enter an amount greater than 0.");
      return;
    }

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    addTransaction({
      title: form.title.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      description: form.description.trim(),
    });

    navigate("/");
  }

  return (
    <main className="transaction-page">
      <div className="transaction-header">
        <p className="transaction-subtitle">
          THE LITTLE LEDGER
        </p>

        <h1>ADD ENTRY</h1>
      </div>

      <form
        className="transaction-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-field">
          <label htmlFor="title">
            TITLE
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Groceries"
          />
        </div>

        <div className="form-field">
          <label htmlFor="amount">
            AMOUNT
          </label>

          <div className="amount-input">
            <span>₱</span>

            <input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-field">
          <label>
            TYPE
          </label>

          <div className="type-options">
            <label className="type-option">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={form.type === "expense"}
                onChange={handleTypeChange}
              />

              <span>EXPENSE</span>
            </label>

            <label className="type-option">
              <input
                type="radio"
                name="type"
                value="income"
                checked={form.type === "income"}
                onChange={handleTypeChange}
              />

              <span>INCOME</span>
            </label>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="category">
            CATEGORY
          </label>

          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories[form.type].map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="date">
            DATE
          </label>

          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">
            DESCRIPTION
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional notes..."
            rows="3"
          />
        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            CANCEL
          </button>

          <button
            type="submit"
            className="submit-button"
          >
            SAVE ENTRY
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddTransaction;