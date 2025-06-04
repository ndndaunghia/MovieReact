import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import userImg from "./user.png";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, getMe } from "../../redux/slices/authSlice";
import { getLocalStorage } from "../../utils/local-store";
import { fetchCategories } from "../../redux/slices/categoriesSlice";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const [searchParams] = useSearchParams();

  // Chỉ lấy query từ URL khi đang ở trang search
  const isSearchPage = location.pathname === "/search";
  const [query, setQuery] = useState(
    isSearchPage ? searchParams.get("q") || "" : ""
  );

  const isLoggedIn = !!user;
  const userName = user?.data?.name || "User";

  // Thêm state để quản lý hiển thị dropdown
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // Reset search input khi rời khỏi trang search
  useEffect(() => {
    if (!isSearchPage) {
      setQuery("");
    }
  }, [location.pathname, isSearchPage]);

  // Xử lý user authentication
  useEffect(() => {
    const token = getLocalStorage("token");
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, user, user.data.id]);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories({ page: 1, perPage: 100, q: "" }));
    }
  }, [dispatch, categories]);

  // Thêm useEffect để xử lý navbar bg khi scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  // Xử lý form submit - Chỉ search khi click nút tìm kiếm
  // Search thì sẽ call api fetch videos với params q để lấy kết quả
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery(""); // Clear input sau khi search
    }
  };

  // Xử lý navigation
  const navigateToCategory = (categorySlug) => {
    setHoveredMenu(null); // Đóng dropdown
    navigate(`/category/${categorySlug}`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "transparent", padding: "0 25px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            loading="lazy"
            style={{ width: "100px" }}
          />
        </Link>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "white" }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active"
                aria-current="page"
                style={{ color: "white", fontWeight: "600" }}
              >
                Trang chủ
              </Link>
            </li>


            {/* Phim với dropdown */}
            <li
              className="nav-item has-megamenu"
              onMouseEnter={() => setHoveredMenu("movie")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                className="nav-link"
                to="/all-movies"
                style={{ color: "#e5e5e5" }}
              >
                Phim
              </Link>
              {hoveredMenu === "movie" && (
                <div className="mega-menu movie-menu">
                  <div className="menu-inner">
                    <div className="menu-column">
                      <h3>Thể loại phim</h3>
                      <div className="category-grid">
                        {categoriesLoading ? (
                          <span className="loading-categories">Đang tải...</span>
                        ) : categories && categories.length > 0 ? (
                          categories.map((category) => (
                            <Link 
                              key={category._id} 
                              to={`/category/${category._id}`} 
                              className="category-item"
                            >
                              {category.name}
                            </Link>
                          ))
                        ) : (
                          <span>Không có thể loại phim</span>
                        )}
                      </div>
                      <div className="view-all">
                        <Link to="/all-movies">Xem tất cả</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                style={{ color: "#e5e5e5" }}
              >
                Mới và phổ biến
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                style={{ color: "#e5e5e5" }}
              >
                Danh sách của tôi
              </a>
            </li>
          </ul>

          {/* Form search - Đã loại bỏ debounce, chỉ submit khi click button */}
          <form className="d-flex search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Phim, diễn viên..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </form>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <span
                className="material-symbols-outlined notifications-icon"
                style={{ color: "white", cursor: "pointer" }}
              >
                notifications
              </span>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {isLoggedIn ? (
                  <span style={{ color: "white" }}>{userName}</span>
                ) : (
                  <img
                    src={userImg}
                    className="img-fluid rounded-1"
                    height="40"
                    width="40"
                    alt="User"
                  />
                )}
              </a>
              {isLoggedIn ? (
                <ul
                  className="dropdown-menu custom-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <li style={{ maxWidth: "120px" }}>
                    <Link to="/profile" className="dropdown-item">
                      Tài khoản
                    </Link>
                  </li>
                  <li style={{ maxWidth: "120px" }}>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              ) : (
                <ul
                  className="dropdown-menu custom-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <li style={{ maxWidth: "120px" }}>
                    <Link to="/sign-in" className="dropdown-item">
                      Đăng nhập
                    </Link>
                  </li>
                  <li style={{ maxWidth: "120px" }}>
                    <Link to="/sign-up" className="dropdown-item">
                      Đăng ký
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
