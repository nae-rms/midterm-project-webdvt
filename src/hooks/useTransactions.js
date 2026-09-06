import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "little-ledger-transactions";

function loadTransactions() {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);

    if (!savedTransactions) {
      return [];
    }

    return JSON.parse(savedTransactions);
  } catch (error) {
    console.error("Failed to load transactions:", error);

    return [];
  }
}

function useTransactions() {
  const [transactions, setTransactions] = useState(
    loadTransactions
  );


  /* =========================
     PERSIST DATA
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);


  /* =========================
     ADD
  ========================= */

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,

      id: crypto.randomUUID(),
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);

    return newTransaction;
  }, []);


  /* =========================
     UPDATE
  ========================= */

  const updateTransaction = useCallback(
    (id, updates) => {
      setTransactions((currentTransactions) =>
        currentTransactions.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                ...updates,
                id,
              }
            : transaction
        )
      );
    },
    []
  );


  /* =========================
     DELETE
  ========================= */

  const deleteTransaction = useCallback((id) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  }, []);


  /* =========================
     GET ONE
  ========================= */

  const getTransaction = useCallback(
    (id) => {
      return transactions.find(
        (transaction) => transaction.id === id
      );
    },
    [transactions]
  );


  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
  };
}

export default useTransactions;