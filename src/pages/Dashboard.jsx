import "../styles/Dashboard.css";

function Dashboard() {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>The Little Ledger</h1>
        </header>
  
        <section className="latest-transaction">
          <h2>Latest Transaction</h2>
  
          <div className="transaction-placeholder">
            No transactions yet.
          </div>
        </section>
  
        <section className="balance-section">
          <h2>Current Balance</h2>
  
          <p className="balance">
            ₱0.00
          </p>
        </section>
  
        <section className="transactions-section">
          <h2>Transactions</h2>
  
          <div className="filters">
            <button>All</button>
            <button>Income</button>
            <button>Expense</button>
          </div>
  
          <div className="transaction-list">
            <p>No transactions yet.</p>
          </div>
        </section>
      </div>
    );
  }
  
  export default Dashboard;