import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <p className="dashboard-subtitle">
          PERSONAL BUDGET TRACKER
        </p>

        <h1>THE LITTLE LEDGER</h1>
      </header>


      <section className="latest-section">

        <div className="section-heading">
          <span className="heading-decoration">◆</span>
          <h2>LATEST ENTRY</h2>
          <span className="heading-decoration">◆</span>
        </div>

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

      </section>


      <section className="balance-section">

        <p className="balance-label">
          CURRENT BALANCE
        </p>

        <div className="balance-display">
          <span>₱</span>
          <strong>0.00</strong>
        </div>

      </section>


      <section className="ledger-section">

        <div className="section-heading">
          <span className="heading-decoration">◆</span>
          <h2>LEDGER</h2>
          <span className="heading-decoration">◆</span>
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

          <div className="ledger-empty">
            <span className="empty-icon">◇</span>

            <p>
              YOUR LEDGER IS EMPTY
            </p>

            <span className="empty-icon">◇</span>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;