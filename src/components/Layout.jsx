import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import "../styles/Layout.css";

function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname === "/";

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "The Little Ledger";
    } else if (location.pathname === "/add") {
      document.title = "Add Entry · The Little Ledger";
    } else if (location.pathname === "/summary") {
      document.title = "Summary · The Little Ledger";
    } else if (location.pathname.startsWith("/transaction/")) {
      document.title = "Entry Details · The Little Ledger";
    } else {
      document.title = "The Little Ledger";
    }
  }, [location.pathname]);

  return (
    <>
      <main>
        <Outlet />
      </main>

      <nav
        className={
          isDashboard
            ? "bottom-nav bottom-nav-fixed"
            : "bottom-nav"
        }
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">◆</span>
          <span>LEDGER</span>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">＋</span>
          <span>ADD ENTRY</span>
        </NavLink>

        <NavLink
          to="/summary"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">▤</span>
          <span>SUMMARY</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Layout;