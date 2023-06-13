import React from "react";
import logo from "./logo.png";
import "./style.css";
export default function SignIn() {
  return (
    <div className="backImg">
      <div className="background">
        <div className="logo">
          <a href="">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="container login-wrapper">
          <form
            className="login"
            style={{ margin: "auto", backgroundColor: "rgba(0,0,0,.75)" }}
          >
            <h1 style={{ color: "#ffff" }}>Đăng nhập</h1>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
                style={{ color: "#8c8c8c" }}
              >
                Email hoặc số điện thoại
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                aria-describedby="emailHelp"
                style={{
                  background: "#333",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  borderBottom: "1px solid orange",
                  color: "white",
                }}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: "#8c8c8c" }}
              >
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                required
                id="password"
                style={{
                  background: "#333",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  borderBottom: "1px solid orange",
                  color: "white",
                }}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  backgroundColor: "#e50914",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                Đăng nhập
              </button>
            </div>
            <div
              className="mb-3 form-check d-flex justify-content-between"
              style={{ fontSize: "14px" }}
            >
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  for="exampleCheck1"
                  style={{ color: "#8c8c8c" }}
                >
                  Ghi nhớ tôi
                </label>
              </div>
              <a
                href=""
                className="text-decoration-none"
                style={{ color: "#8c8c8c" }}
              >
                Bạn cần trợ giúp
              </a>
            </div>
            <div className="mb-4">
              <span>Bạn mới tham gia Netflix?</span>
              <a
                href=""
                className="text-decoration-none ms-1"
                style={{ color: "white" }}
              >
                Đăng ký ngay
              </a>
            </div>
          </form>
        </div>
        {/* <footer className="mt-5"  style={{background: 'rgba(0, 0, 0, 0.75)'}}>
          <div className="row container">
            <a href="">Bạn có câu hỏi? Liên hệ với chúng tôi</a>
          </div>
          <div className="row row-cols-2 row-cols-lg-4 container">
          <div className="col">
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", opacity: "0.6", fontSize: "14px" }}
          >
            <p>Mô tả âm thanh</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", opacity: "0.6", fontSize: "14px" }}
          >
            <p>Quan hệ với nhà đầu tư</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", opacity: "0.6", fontSize: "14px" }}
          >
            <p>Thông báo pháp lý</p>
          </a>
        </div>
          </div>
        </footer> */}
        <footer className="mt-5" style={{ background: "rgba(0, 0, 0, 0.75)" }}>
          <div className="container">
            <div className="row">
              <a
                href=""
                className="text-decoration-none my-4"
                style={{ color: "#ffff", opacity: "0.6" }}
              >
                Bạn có câu hỏi? Liên hệ với chúng tôi
              </a>
            </div>
            <div className="row row-cols-2 row-cols-lg-4">
              <div className="col">
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ffff", opacity: "0.6" }}
                >
                  <p>Câu hỏi thường gặp</p>
                </a>
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ffff", opacity: "0.6" }}
                >
                  <p>Tuỳ chọn cookie</p>
                </a>
              </div>
              <div className="col">
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ffff", opacity: "0.6" }}
                >
                  <p>Trung tâm trợ giúp</p>
                </a>
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ffff", opacity: "0.6" }}
                >
                  <p>Thông tin doanh nghiệp</p>
                </a>
              </div>
              <div className="col">
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ffff", opacity: "0.6" }}
                >
                  <p>Điều khoản sử dụng</p>
                </a>
              </div>
              <div className="col">
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ffff", opacity: "0.6" }}
                >
                  <p>Quyền riêng tư</p>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col mb-5">
                <i class="fa-solid fa-globe me-2"></i>
                <select name="" id="" style={{backgroundColor: 'transparent', color: '#ffff', opacity: '0.8'}}>
                  <option value="">Tiếng việt</option>
                  <option value="">English</option>
                </select>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
