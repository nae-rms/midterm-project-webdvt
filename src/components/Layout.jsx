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
      document.title = "The Little Ledger | Add Entry";
    } else if (location.pathname === "/summary") {
      document.title = "The Little Ledger | Summary";
    } else if (location.pathname.startsWith("/transaction/")) {
      document.title = "The Little Ledger | Entry Details";
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