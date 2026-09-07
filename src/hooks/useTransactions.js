import {
    useCallback,
    useEffect,
    useState,
  } from "react";
  
  const STORAGE_KEY = "little-ledger-transactions";
  
  function loadTransactions() {
    try {
      const savedTransactions =
        localStorage.getItem(STORAGE_KEY);
  
      if (!savedTransactions) {
        return [];
      }
  
      return JSON.parse(savedTransactions);
    } catch (error) {
      console.error(
        "Failed to load transactions:",
        error
      );
  
      return [];
    }
  }
  
  function useTransactions() {
    const [transactions, setTransactions] =
      useState(loadTransactions);
  
    useEffect(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(transactions)
        );
      } catch (error) {
        console.error(
          "Failed to save transactions:",
          error
        );
      }
    }, [transactions]);
  
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
  
    const deleteTransaction = useCallback((id) => {
      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) => transaction.id !== id
        )
      );
    }, []);
  
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