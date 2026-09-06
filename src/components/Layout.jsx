import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/summary">Summary</Link>
      </nav>
    </>
  );
}

export default Layout;