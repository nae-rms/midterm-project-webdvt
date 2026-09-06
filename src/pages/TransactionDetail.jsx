import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useTransactions from "../hooks/useTransactions";
import { categories } from "../data/categories";

import "../styles/TransactionDetail.css";

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const transaction = getTransaction(id);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState(() => {
    if (!transaction) {
      return null;
    }

    return {
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
      description: transaction.description || "",
    };
  });

  const [error, setError] = useState("");


  if (!transaction || !form) {
    return (
      <main className="transaction-detail-page">
        <div className="detail-not-found">
          <p className="detail-subtitle">
            THE LITTLE LEDGER
          </p>

          <h1>ENTRY NOT FOUND</h1>

          <p>
            This transaction does not exist.
          </p>

          <Link to="/" className="detail-back-button">
            BACK TO LEDGER
          </Link>
        </div>
      </main>
    );
  }


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


  function handleSave(event) {
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

    updateTransaction(id, {
      title: form.title.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      description: form.description.trim(),
    });

    setIsEditing(false);
    setError("");
  }


  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
      return;
    }

    deleteTransaction(id);
    navigate("/");
  }


  function handleCancel() {
    setForm({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
      description: transaction.description || "",
    });

    setError("");
    setIsEditing(false);
  }


  const formattedAmount = Number(
    transaction.amount
  ).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
  });


  return (
    <main className="transaction-detail-page">

      <div className="transaction-detail-header">

        <p className="detail-subtitle">
          THE LITTLE LEDGER
        </p>

        <h1>ENTRY DETAILS</h1>

      </div>


      {isEditing ? (
        <form
          className="detail-form"
          onSubmit={handleSave}
          noValidate
        >

          <div className="detail-field">
            <label htmlFor="title">
              TITLE
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
            />
          </div>


          <div className="detail-field">
            <label htmlFor="amount">
              AMOUNT
            </label>

            <div className="detail-amount-input">
              <span>₱</span>

              <input
                id="amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
          </div>


          <div className="detail-field">
            <label>
              TYPE
            </label>

            <div className="detail-type-options">

              <label>
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={form.type === "expense"}
                  onChange={handleTypeChange}
                />

                EXPENSE
              </label>

              <label>
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={form.type === "income"}
                  onChange={handleTypeChange}
                />

                INCOME
              </label>

            </div>
          </div>


          <div className="detail-field">
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


          <div className="detail-field">
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


          <div className="detail-field">
            <label htmlFor="description">
              DESCRIPTION
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
            />
          </div>


          {error && (
            <p className="detail-error">
              {error}
            </p>
          )}


          <div className="detail-actions">

            <button
              type="button"
              className="detail-cancel-button"
              onClick={handleCancel}
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="detail-save-button"
            >
              SAVE CHANGES
            </button>

          </div>

        </form>
      ) : (
        <section className="transaction-card">

          <div className="transaction-card-top">

            <div>
              <p className="transaction-card-label">
                {transaction.type === "income"
                  ? "INCOME"
                  : "EXPENSE"}
              </p>

              <h2>
                {transaction.title}
              </h2>
            </div>

            <p className="transaction-card-amount">
              {transaction.type === "income"
                ? "+"
                : "-"}
              ₱{formattedAmount}
            </p>

          </div>


          <div className="transaction-information">

            <div className="information-row">
              <span>CATEGORY</span>
              <strong>{transaction.category}</strong>
            </div>

            <div className="information-row">
              <span>DATE</span>
              <strong>{transaction.date}</strong>
            </div>

            <div className="information-row">
              <span>DESCRIPTION</span>
              <strong>
                {transaction.description || "No description"}
              </strong>
            </div>

          </div>


          <div className="detail-actions">

            <button
              type="button"
              className="detail-edit-button"
              onClick={() => setIsEditing(true)}
            >
              EDIT
            </button>

            <button
              type="button"
              className="detail-delete-button"
              onClick={handleDelete}
            >
              DELETE
            </button>

            <Link
              to="/"
              className="detail-back-button"
            >
              BACK
            </Link>

          </div>

        </section>
      )}

    </main>
  );
}

export default TransactionDetail;