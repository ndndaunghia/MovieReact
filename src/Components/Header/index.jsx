import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import user from "./user.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import './style.css';
import axios from "axios";
import { API_KEY } from "../../API";
import { useDispatch } from "react-redux";
import { getSearchAsync } from "../../movies/search";

export default function Header() {
  const accessToken = localStorage.getItem("at");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(accessToken ? true : false);
  const [searchValue, setSearchValue] = useSearchParams();
  const [query, setQuery] = useState(searchValue.get('q'));

  const logOut = () => {
    localStorage.removeItem("at");
    localStorage.removeItem("uid");
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(isLoggedIn === 'true');
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(getSearchAsync(query));
    navigate(`/search?${query}`);
    setQuery('');
  }
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "transparent", padding: '0 25px' }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src={logo} alt="" loading="lazy" style={{ width: "100px" }} />
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
              <Link to='/'
                className="nav-link active"
                aria-current="page"
                href="#"
                style={{ color: "white", fontWeight: "600" }}
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/tv-series' style={{ color: "#e5e5e5" }}>
                Phim T.hình
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/all-movies' style={{ color: "#e5e5e5" }}>
                Phim
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "#e5e5e5" }}>
                Mới & phổ biến
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/mylist' style={{ color: "#e5e5e5" }}>
                Danh sách của tôi
              </Link>
            </li>
          </ul>
          <form className="d-flex input-group w-auto gap-2" onSubmit={handleSearch}>
            <input
              type="search"
              className="form-control"
              // placeholder="Phim, diễn viên..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                backgroundColor: "transparent",
                color: 'white',
                outline: "none",
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: "0",
                boxShadow: "none",
                padding: "0",
              }}
            />
            <span
              className="material-symbols-outlined search-icon d-flex justify-content-center align-items-center mx-2"
              style={{ color: "white", cursor: "pointer" }}
            >
              search
            </span>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item  d-flex align-items-center">
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
                // aria-expanded="false"
              >
                <img src={user} className="img-fluid rounded-1" height="40" width="40" alt="" />
              </a>
             {isLoggedIn ? (
               <ul className="dropdown-menu custom-menu" aria-labelledby="navbarDropdown" >
               <li style={{maxWidth: '120px'}}>
                 <Link to="/profile" className="dropdown-item">
                   Tài khoản
                 </Link>
               </li>
  
               <li style={{maxWidth: '120px'}}>
                 <Link to="/" className="dropdown-item" onClick={logOut}>
                   Đăng xuất
                 </Link>
               </li>
             </ul>
             ) : (
              <ul className="dropdown-menu custom-menu" aria-labelledby="navbarDropdown" >
              <li style={{maxWidth: '120px'}}>
                <Link to="/sign-in" className="dropdown-item">
                  Đăng nhập
                </Link>
              </li>
              <li style={{maxWidth: '120px'}}>
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
