import React from "react";
import "./style.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Số trang hiển thị tối đa
  const maxDisplayedPages = 5;

  // Tính toán các trang sẽ hiển thị
  const getPageNumbers = () => {
    const pages = [];

    // Nếu tổng số trang nhỏ hơn hoặc bằng số trang hiển thị tối đa
    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Xác định trang bắt đầu và kết thúc
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxDisplayedPages / 2)
      );
      let endPage = startPage + maxDisplayedPages - 1;

      // Điều chỉnh nếu endPage vượt quá totalPages
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxDisplayedPages + 1);
      }

      // Thêm trang đầu tiên và dấu ...
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Thêm các trang ở giữa
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Thêm dấu ... và trang cuối cùng
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="netflix-pagination">
      <div className="pagination-container">
        {/* Nút Previous */}
        <button
          className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Các trang */}
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="pagination-dots">...</span>
              ) : (
                <button
                  className={`pagination-number ${
                    page === currentPage ? "active" : ""
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Nút Next */}
        <button
          className={`pagination-arrow ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Thông tin phân trang */}
      <div className="pagination-info">
        <span>
          Trang {currentPage} / {totalPages}
        </span>
      </div>
    </div>
  );
}
