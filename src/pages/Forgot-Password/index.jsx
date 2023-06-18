import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
        setShowSuccessAlert(true);
        setTimeout(() => {
            navigate('/sign-in');
        }, 2000)
    })
    .catch((error) => {
        console.log(error);
    })
  };
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
              onSubmit={handleSubmit}
            className="login"
            style={{ margin: "auto", backgroundColor: "rgba(0,0,0,.75)" }}
          >
            <h1 style={{ color: "#ffff" }}>Quên mật khẩu</h1>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
                style={{ color: "#8c8c8c" }}
              >
                Nhập email của bạn
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Xác nhận
              </button>
            </div>
          </form>
        </div>

         <Snackbar 
        open={showSuccessAlert}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => {setShowSuccessAlert(false)}}
      >
        <Alert onClose={() => setShowSuccessAlert(false)} severity="success">
          Vui lòng kiểm tra email của bạn!
        </Alert>
      </Snackbar> 

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
                <i className="fa-solid fa-globe me-2"></i>
                <select
                  name=""
                  id=""
                  style={{
                    backgroundColor: "transparent",
                    color: "#ffff",
                    opacity: "0.8",
                  }}
                >
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
