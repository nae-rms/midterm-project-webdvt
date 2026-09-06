import CatOffice from "../components/CatOffice";
import useTransactions from "../hooks/useTransactions";

import "../styles/Dashboard.css";

function Dashboard() {
  const { transactions } = useTransactions();

  const latestTransaction = transactions[0];

  const balance = transactions.reduce(
    (total, transaction) => {
      if (transaction.type === "income") {
        return total + Number(transaction.amount);
      }

      return total - Number(transaction.amount);
    },
    0
  );

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <p className="dashboard-subtitle">
          PERSONAL BUDGET TRACKER
        </p>

        <h1>THE LITTLE LEDGER</h1>

        <CatOffice />

      </header>


      {/* =========================
          LATEST ENTRY
      ========================= */}

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


        <div className="latest-entry">

          {latestTransaction ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}

        </div>

      </section>


      {/* =========================
          BALANCE
      ========================= */}

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


      {/* =========================
          LEDGER
      ========================= */}

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

          <button className="filter-active">
            ALL
          </button>

          <button>
            INCOME
          </button>

          <button>
            EXPENSE
          </button>

        </div>


        <div className="ledger-list">

          {transactions.length === 0 ? (
            <div className="ledger-empty">

              <span className="empty-icon">
                ◇
              </span>

              <p>
                YOUR LEDGER IS EMPTY
              </p>

              <span className="empty-icon">
                ◇
              </span>

            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
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
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  ₱
                  {Number(
                    transaction.amount
                  ).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </p>

              </div>
            ))
          )}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;