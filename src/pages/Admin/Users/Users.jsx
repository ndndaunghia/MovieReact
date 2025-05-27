import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../../redux/slices/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../Components/common/Loading/Loading";
import "./Users.css";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, totalUsers, currentPage, perPage } =
    useSelector((state) => state.users);

  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'view'
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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

  const totalPages = Math.ceil(totalUsers / perPage);
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
      fetchUsers({
        page: page,
        perPage: perPage,
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

  const handleOpenModal = (type, user = null) => {
    setModalType(type);
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email, // Ensure the email field is included
        status: user.status, // Include status if needed for editing
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        status: 1, // Default status value
      });
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditingUser(null);
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
      if (editingUser) {
        await dispatch(
          updateUser({ id: editingUser._id, userData: formData })
        ).unwrap();

        toast.success("Cập nhật người dùng thành công!");
      } else {
        await dispatch(createUser(formData)).unwrap();
        toast.success("Thêm người dùng thành công!");
      }
      await dispatch(
        fetchUsers({ page, perPage, searchTerm: debouncedSearchTerm })
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
      // toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        toast.success("Xóa người dùng thành công!");
        await dispatch(
          fetchUsers({ page, perPage, searchTerm: debouncedSearchTerm })
        );
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
              <label htmlFor="name">Tên người dùng</label>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
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
              <label htmlFor="name">Tên người dùng</label>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Trạng thái</label>
              <select
                style={{ padding: "0.5rem" }}
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value={1}>Đang hoạt động</option>
                <option value={0}>Ngưng hoạt động</option>
              </select>
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
          <div className="user-detail">
            <div className="form-group">
              <label>Tên người dùng</label>
              <p>{editingUser?.name}</p>
            </div>
            <div className="form-group">
              <label>Email</label>
              <p>{editingUser?.email}</p>
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <p>
                {editingUser?.status === 1
                  ? "Đang hoạt động"
                  : "Ngưng hoạt động"}
              </p>
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
                onClick={() => handleOpenModal("edit", editingUser)}
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

  if (loading && !users?.data?.users?.length) {
    return <Loading fullScreen text="Đang tải dữ liệu người dùng..." />;
  }
  return (
    <div className="users">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="users__header">
        <div className="users-title">
          <h1>Danh sách người dùng</h1>
          <p>Quản lý danh sách người dùng trong hệ thống</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal("add")}
        >
          + <span>Thêm người dùng</span>
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="users__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.type === 0 ? "Người dùng" : "Quản trị viên"}</td>
                  <td>
                    {user.status === 1 ? "Đang hoạt động" : "Ngưng hoạt động"}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="action-btn view-btn"
                        title="Xem chi tiết"
                        onClick={() => handleOpenModal("view", user)}
                      >
                        👁️
                      </button>
                      <button
                        className="action-btn edit-btn"
                        title="Chỉnh sửa"
                        onClick={() => handleOpenModal("edit", user)}
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Xóa"
                        onClick={() => handleDelete(user._id)}
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
                    ? "Không tìm thấy người dùng nào phù hợp"
                    : "Chưa có người dùng nào trong hệ thống"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalUsers > 0 && (
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
            Trang {page}/{totalPages}, Tổng số: {totalUsers} người dùng
          </div>
        </div>
      )}

      {modalType && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {modalType === "add"
                ? "Thêm người dùng mới"
                : modalType === "edit"
                ? "Sửa người dùng"
                : "Chi tiết người dùng"}
            </h2>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
