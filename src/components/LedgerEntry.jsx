import { memo } from "react";
import { Link } from "react-router-dom";

const LedgerEntry = memo(function LedgerEntry({
  transaction,
}) {
  const formattedAmount = Number(
    transaction.amount
  ).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
  });

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className="ledger-entry"
    >
      <div>
        <p className="ledger-entry-title">
          {transaction.title}
        </p>

        <p className="ledger-entry-meta">
          {transaction.category} ·{" "}
          {transaction.date}
        </p>
      </div>

      <p className="ledger-entry-amount">
        {transaction.type === "income" ? "+" : "-"}
        ₱{formattedAmount}
      </p>
    </Link>
  );
});

export default LedgerEntry;