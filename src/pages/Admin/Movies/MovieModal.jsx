// MovieModal.jsx - Phiên bản đơn giản hóa
import React, { useEffect } from "react";
import "./MovieModal.css"; // Đổi tên file CSS cho rõ ràng

const MovieModal = ({ isOpen, onClose, title, children, footer }) => {
  // Ngăn cuộn trang khi modal mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      console.log("Modal opened and body scroll disabled");
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  console.log("Rendering modal with title:", title);

  // Sử dụng inline styles thay vì CSS để loại bỏ các vấn đề liên quan đến CSS
  return (
    <div className="movie-modal-overlay" onClick={onClose}>
      <div className="movie-modal" onClick={e => e.stopPropagation()}>
        <div className="movie-modal-header">
          <h3 className="movie-modal-title">{title}</h3>
          <button className="movie-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="movie-modal-body">{children}</div>
        {footer && <div className="movie-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default MovieModal;