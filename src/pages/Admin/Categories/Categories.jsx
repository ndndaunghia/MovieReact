import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  clearError,
} from "../../../redux/slices/categoriesSlice";
import "./Categories.css";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../Components/common/Loading/Loading";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, totalCategories, currentPage, perPage } =
    useSelector((state) => state.categories);

  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'view'
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalCategories / perPage);
  const pageNumbers = [];
  const maxPageButtons = 5;

  if (totalPages <= maxPageButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }

  useEffect(() => {
    dispatch(
      fetchCategories({
        page,
        perPage,
        q: debouncedSearchTerm,
      })
    );
  }, [dispatch, page, perPage, debouncedSearchTerm]);


  useEffect(() => {
    if (error) {
      toast.error(error.detail?.name || "Có lỗi xảy ra, vui lòng thử lại!");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleOpenModal = (type, category = null) => {
    setModalType(type);
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
      });
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
    });
    dispatch(clearError());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await dispatch(
          updateCategory({ id: editingCategory._id, categoryData: formData })
        ).unwrap();
        
        toast.success("Cập nhật danh mục thành công!");
      } else {
        await dispatch(createCategory(formData)).unwrap();
        toast.success("Thêm danh mục thành công!");
      }
      await dispatch(fetchCategories({ page, perPage, searchTerm: debouncedSearchTerm }));
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
      // toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success("Xóa danh mục thành công!");
        await dispatch(fetchCategories({ page, perPage, searchTerm: debouncedSearchTerm }));
      } catch (error) {
        console.error("Error:", error);
        // toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      }
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "add":
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên danh mục</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <div className="error-message">{error.detail?.name}</div>}
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Thêm mới"}
              </button>
            </div>
          </form>
        );

      case "edit":
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên danh mục</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            {error && <div className="error-message">{error.detail?.name}</div>}
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Cập nhật"}
              </button>
            </div>
          </form>
        );

      case "view":
        return (
          <div className="category-detail">
            <div className="form-group">
              <label>Tên danh mục</label>
              <p>{editingCategory?.name}</p>
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <p>{editingCategory?.description}</p>
            </div>
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenModal("edit", editingCategory)}
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading && !categories?.data?.categories?.length) {
    return <Loading fullScreen text="Đang tải dữ liệu danh mục phim..." />;
  }
  console.log();
  

  return (
    <div className="categories">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="categories__header">
        <div className="categories-title">
          <h1>Thể loại phim</h1>
          <p>Quản lý danh sách danh mục phim trong hệ thống</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal("add")}
        >
          + <span>Thêm danh mục</span>
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm thể loại..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="categories__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {/* {categories?.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="action-btn view-btn"
                      title="Xem chi tiết"
                      onClick={() => handleOpenModal('view', category)}
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn edit-btn"
                      title="Chỉnh sửa"
                      onClick={() => handleOpenModal('edit', category)}
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Xóa"
                      onClick={() => handleDelete(category._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))} */}
            {categories?.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="action-btn view-btn"
                        title="Xem chi tiết"
                        onClick={() => handleOpenModal("view", category)}
                      >
                        👁️
                      </button>
                      <button
                        className="action-btn edit-btn"
                        title="Chỉnh sửa"
                        onClick={() => handleOpenModal("edit", category)}
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Xóa"
                        onClick={() => handleDelete(category._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  {debouncedSearchTerm
                    ? "Không tìm thấy thể loại nào phù hợp"
                    : "Chưa có thể loại nào trong hệ thống"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalCategories > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            « Trước
          </button>

          {pageNumbers.map((pageNum, index) =>
            pageNum === "..." ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                className={`pagination-btn ${page === pageNum ? "active" : ""}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          )}

          <button
            className="pagination-btn"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Sau »
          </button>

          <div className="pagination-info">
            Trang {page}/{totalPages}, Tổng số: {totalCategories} thể loại
          </div>
        </div>
      )}

      {modalType && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {modalType === "add"
                ? "Thêm danh mục mới"
                : modalType === "edit"
                ? "Sửa danh mục"
                : "Chi tiết danh mục"}
            </h2>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
