"use client"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import "./AdminLayout.css"

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/movies", label: "Movies", icon: "🎬" },
    { path: "/admin/users", label: "Users", icon: "👥" },
    { path: "/admin/categories", label: "Categories", icon: "📑" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/sign-in")
  }

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <div className="admin-avatar">
          <img src="https://i.pravatar.cc/150?img=12" alt="avatar" />
          <span>{user?.user?.email || "Admin"}</span>
        </div>
        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-footer">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
