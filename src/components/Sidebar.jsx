import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        Navigation
      </div>

      <nav className="sidebar-nav">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/purchases"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">📦</span>
          <span>Purchases</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">🛒</span>
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">📈</span>
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">⚙️</span>
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;