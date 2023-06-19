import React from "react";
import './style.css'
export default function Footer() {
  return (
    <footer className="container" style={{ padding: "120px 100px 50px 100px" }}>
      <div className="row" style={{ width: "240px" }}>
        <div className="col d-flex justify-content-between align-items-center">
          <i
            className="fa-brands fa-facebook fa-2xl"
            style={{ color: "white", cursor: 'pointer' }}
          ></i>
          <i
            className="fa-brands fa-instagram fa-2xl"
            style={{ color: "white", cursor: 'pointer' }}
          ></i>
          <i className="fa-brands fa-twitter fa-2xl" style={{ color: "white", cursor: 'pointer' }}></i>
          <i className="fa-brands fa-youtube fa-2xl" style={{ color: "white", cursor: 'pointer' }}></i>
        </div>
      </div>
      <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3 mt-5">
        <div className="col link-a">
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Mô tả âm thanh</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Quan hệ với nhà đầu tư</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Thông báo pháp lý</p>
          </a>
        </div>
        <div className="col link-a">
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Trung tâm trợ giúp</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Việc làm</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Tuỳ chọn cookie</p>
          </a>
        </div>
        <div className="col link-a">
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Thẻ quà tặng</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Điều khoản sử dụng</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Thông tin doanh nghiệp</p>
          </a>
        </div>
        <div className="col link-a">
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Trung tâm đa phương tiện</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Quyền riêng tư</p>
          </a>
          <a
            href=""
            className="text-decoration-none"
            style={{ color: "#ffff", fontSize: "14px" }}
          >
            <p>Liên hệ với chúng tôi</p>
          </a>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button type="button" style={{width: '100px',height: '32px', backgroundColor: 'transparent', outline: 'none', border: '1px solid white', color: 'white', opacity: '0.6', fontSize: '14px'}}>Mã dịch vụ</button>
          <p className="mt-3" style={{color: 'white', opacity: '0.6', fontSize: '12px'}}>1997-2023 Netflix, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
