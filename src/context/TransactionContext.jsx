import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
  } from "react";
  
  const TransactionContext = createContext();
  
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
  
  function TransactionProvider({ children }) {
    const [transactions, setTransactions] =
      useState(loadTransactions);
  
    useEffect(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
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
  
    return (
      <TransactionContext.Provider
        value={{
          transactions,
          addTransaction,
          updateTransaction,
          deleteTransaction,
          getTransaction,
        }}
      >
        {children}
      </TransactionContext.Provider>
    );
  }
  
  export function useTransactions() {
    return useContext(TransactionContext);
  }
  
  export default TransactionProvider;