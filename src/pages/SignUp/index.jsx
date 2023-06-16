import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import logo from "./logo.png";
import "./style.css";
import { useNavigate } from "react-router-dom";
import app from "../../Firebase";
import { Alert, Snackbar } from "@mui/material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();

    if (password === confirmPw) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: user.email,
            userName: userName,
          };

          const db = getFirestore(app);
          addDoc(collection(db, "users"), userData)
            .then((docRef) => {
              console.log("id: ", docRef.id);
              setShowSuccessAlert(true);
              setTimeout(() => {
                navigate("/sign-in");
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
              setShowErrorAlert(true);
            });
        })
        .catch((error) => {
          console.log(error);
          setShowErrorAlert(true);
        });
    } else {
      setShowWarningAlert(true);
    }
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
            onSubmit={onSubmit}
            className="login"
            style={{ margin: "auto", backgroundColor: "rgba(0,0,0,.75)" }}
          >
            <h1 style={{ color: "#ffff" }} className="text-center mb-3">
              Đăng ký
            </h1>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                htmlFor="userName"
                className="form-label"
                style={{ color: "#8c8c8c" }}
              >
                Tên người dùng
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                htmlFor="confirmPassword"
                className="form-label"
                style={{ color: "#8c8c8c" }}
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                required
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                id="confirmPassword"
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
            <div className="my-5">
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
                Đăng ký
              </button>
            </div>
          </form>
        </div>

        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={() => setShowSuccessAlert(false)}
        >
          <Alert onClose={() => setShowSuccessAlert(false)} severity="success">
            Đăng ký thành công!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showErrorAlert}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={() => setShowErrorAlert(false)}
        >
          <Alert onClose={() => setShowErrorAlert(false)} severity="error">
            Đăng ký thất bại!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showWarningAlert}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={() => setShowWarningAlert(false)}
        >
          <Alert onClose={() => setShowWarningAlert(false)} severity="warning">
            Mật khẩu không khớp!
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
