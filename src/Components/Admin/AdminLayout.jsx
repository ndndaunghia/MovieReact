import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import "./AdminLayout.css"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/authSlice"

const AdminLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const menuItems = [
    // { path: "/admin/dashboard", label: "Trang chủ", icon: "📊" },
    { path: "/admin/movies", label: "Danh sách phim", icon: "🎬" },
    { path: "/admin/users", label: "Danh sách người dùng", icon: "👥" },
    { path: "/admin/categories", label: "Thể loại phim", icon: "📑" },
  ]

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  }

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Quản lý phim</h2>
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
            Đăng xuất
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
