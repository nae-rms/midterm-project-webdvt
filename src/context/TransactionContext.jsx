import {
  createContext,
  useContext,
} from "react";

import useTransactionsHook from "../hooks/useTransactions";

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const transactionData =
    useTransactionsHook();

  return (
    <TransactionContext.Provider
      value={transactionData}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}

export default TransactionProvider;