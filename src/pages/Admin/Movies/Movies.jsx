import React, { useState } from "react";
import "./Movies.css";
import MovieModal from "./MovieModal";

const Movies = () => {
  // State cho danh sách phim
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avengers: Endgame",
      poster: "https://via.placeholder.com/40x60",
      category: "Hành động",
      director: "Anthony Russo, Joe Russo",
      year: 2019,
      duration: 181,
      status: "published",
    },
    {
      id: 2,
      title: "Joker",
      poster: "https://via.placeholder.com/40x60",
      category: "Tâm lý",
      director: "Todd Phillips",
      year: 2019,
      duration: 122,
      status: "published",
    },
    {
      id: 3,
      title: "Parasite",
      poster: "https://via.placeholder.com/40x60",
      category: "Kinh dị",
      director: "Bong Joon-ho",
      year: 2019,
      duration: 132,
      status: "draft",
    },
    {
      id: 4,
      title: "The Shawshank Redemption",
      poster: "https://via.placeholder.com/40x60",
      category: "Tâm lý",
      director: "Frank Darabont",
      year: 1994,
      duration: 142,
      status: "published",
    },
    {
      id: 5,
      title: "Inception",
      poster: "https://via.placeholder.com/40x60",
      category: "Khoa học viễn tưởng",
      director: "Christopher Nolan",
      year: 2010,
      duration: 148,
      status: "published",
    },
    {
      id: 6,
      title: "The Dark Knight",
      poster: "https://via.placeholder.com/40x60",
      category: "Hành động",
      director: "Christopher Nolan",
      year: 2008,
      duration: 152,
      status: "published",
    },
    {
      id: 7,
      title: "Pulp Fiction",
      poster: "https://via.placeholder.com/40x60",
      category: "Tội phạm",
      director: "Quentin Tarantino",
      year: 1994,
      duration: 154,
      status: "published",
    },
  ]);

  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // State cho modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  // State cho form
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    director: "",
    year: new Date().getFullYear(),
    duration: 90,
    description: "",
    status: "draft",
  });

  // State cho validation
  const [errors, setErrors] = useState({});

  // Danh sách các danh mục
  const categories = [
    "Hành động",
    "Tâm lý",
    "Kinh dị",
    "Hài",
    "Tình cảm",
    "Khoa học viễn tưởng",
    "Phiêu lưu",
    "Hoạt hình",
    "Tội phạm",
    "Tài liệu",
  ];

  // Lọc phim dựa trên các bộ lọc
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || movie.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || movie.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Xử lý thay đổi form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Xóa lỗi khi người dùng sửa
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tên phim không được để trống";
    }

    if (!formData.category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    if (!formData.director.trim()) {
      newErrors.director = "Tên đạo diễn không được để trống";
    }

    if (
      !formData.year ||
      formData.year < 1900 ||
      formData.year > new Date().getFullYear()
    ) {
      newErrors.year = `Năm phải từ 1900 đến ${new Date().getFullYear()}`;
    }

    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = "Thời lượng phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý thêm phim mới
  const handleAddMovie = () => {
    if (!validateForm()) return;

    const newMovie = {
      ...formData,
      id: movies.length + 1,
      poster: "https://via.placeholder.com/40x60",
    };

    setMovies([...movies, newMovie]);
    setShowAddModal(false);
    resetForm();
  };

  // Xử lý cập nhật phim
  const handleUpdateMovie = () => {
    if (!validateForm()) return;

    const updatedMovies = movies.map((movie) =>
      movie.id === currentMovie.id ? { ...movie, ...formData } : movie
    );

    setMovies(updatedMovies);
    setShowEditModal(false);
    resetForm();
  };

  // Xử lý xóa phim
  const handleDeleteMovie = () => {
    const updatedMovies = movies.filter(
      (movie) => movie.id !== currentMovie.id
    );
    setMovies(updatedMovies);
    setShowDeleteModal(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      director: "",
      year: new Date().getFullYear(),
      duration: 90,
      description: "",
      status: "draft",
    });
    setErrors({});
  };

  // Mở modal chỉnh sửa
  const openEditModal = (movie) => {
    setCurrentMovie(movie);
    setFormData({
      title: movie.title,
      category: movie.category,
      director: movie.director,
      year: movie.year,
      duration: movie.duration,
      description: movie.description || "",
      status: movie.status,
    });
    setShowEditModal(true);
  };

  // Mở modal xem chi tiết
  const openViewModal = (movie) => {
    setCurrentMovie(movie);
    setShowViewModal(true);
  };

  // Mở modal xóa
  const openDeleteModal = (movie) => {
    setCurrentMovie(movie);
    setShowDeleteModal(true);
  };

  return (
    <div className="movies-page">
      <div className="movies-header">
        <div className="movies-title">
          <h1>Quản lý phim</h1>
          <p>Quản lý danh sách phim trong hệ thống</p>
        </div>
        <button className="add-movie-btn" onClick={() => setShowAddModal(true)}>
          + <span>Thêm phim mới</span>
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="published">Đã xuất bản</option>
          <option value="draft">Bản nháp</option>
        </select>
      </div>

      <div className="movies-table-container">
        <table className="movies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên phim</th>
              <th>Danh mục</th>
              <th>Đạo diễn</th>
              <th>Năm</th>
              <th>Thời lượng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>
                  <div className="movie-title-cell">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <span className="movie-title">{movie.title}</span>
                  </div>
                </td>
                <td>{movie.category}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.duration} phút</td>
                <td>
                  <span className={`movie-status status-${movie.status}`}>
                    {movie.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="action-btn view-btn"
                      title="Xem chi tiết"
                      onClick={() => openViewModal(movie)}
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn edit-btn"
                      title="Chỉnh sửa"
                      onClick={() => openEditModal(movie)}
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Xóa"
                      onClick={() => openDeleteModal(movie)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="pagination-btn" disabled>
            &laquo;
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">&raquo;</button>
        </div>
      </div>

      {/* Modal thêm phim mới */}
      <MovieModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Thêm phim mới"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleAddMovie}>
              Thêm mới
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Tên phim</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Danh mục</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <div className="error-message">{errors.category}</div>}
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Đạo diễn</label>
              <input
                type="text"
                name="director"
                className="form-control"
                value={formData.director}
                onChange={handleChange}
              />
              {errors.director && <div className="error-message">{errors.director}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Năm sản xuất</label>
              <input
                type="number"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && <div className="error-message">{errors.year}</div>}
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Thời lượng (phút)</label>
              <input
                type="number"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
              />
              {errors.duration && <div className="error-message">{errors.duration}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Trạng thái</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Đã xuất bản</option>
          </select>
        </div>
      </MovieModal>

      {/* Modal xem chi tiết phim */}
      <MovieModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Chi tiết phim"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
              Đóng
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowViewModal(false);
                openEditModal(currentMovie);
              }}
            >
              Chỉnh sửa
            </button>
          </>
        }
      >
        {currentMovie && (
          <div className="movie-detail">
            <div className="movie-detail-header">
              <img
                src={currentMovie.poster || "/placeholder.svg"}
                alt={currentMovie.title}
                className="movie-detail-poster"
                style={{
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                  marginRight: "20px",
                }}
              />
              <div>
                <h2 style={{ margin: "0 0 10px 0" }}>{currentMovie.title}</h2>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Danh mục:</strong> {currentMovie.category}
                </p>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Đạo diễn:</strong> {currentMovie.director}
                </p>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Năm sản xuất:</strong> {currentMovie.year}
                </p>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Thời lượng:</strong> {currentMovie.duration} phút
                </p>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Trạng thái:</strong>{" "}
                  <span className={`movie-status status-${currentMovie.status}`}>
                    {currentMovie.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </p>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "10px" }}>Mô tả</h4>
              <p>{currentMovie.description || "Không có mô tả."}</p>
            </div>
          </div>
        )}
      </MovieModal>

      {/* Modal chỉnh sửa phim */}
      <MovieModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Chỉnh sửa phim"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleUpdateMovie}>
              Cập nhật
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Tên phim</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Danh mục</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <div className="error-message">{errors.category}</div>}
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Đạo diễn</label>
              <input
                type="text"
                name="director"
                className="form-control"
                value={formData.director}
                onChange={handleChange}
              />
              {errors.director && <div className="error-message">{errors.director}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Năm sản xuất</label>
              <input
                type="number"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && <div className="error-message">{errors.year}</div>}
            </div>
          </div>

          <div className="form-col">
            <div className="form-group">
              <label className="form-label">Thời lượng (phút)</label>
              <input
                type="number"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
              />
              {errors.duration && <div className="error-message">{errors.duration}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Trạng thái</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Đã xuất bản</option>
          </select>
        </div>
      </MovieModal>

      {/* Modal xác nhận xóa phim */}
      <MovieModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Xác nhận xóa"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
              Hủy
            </button>
            <button className="btn btn-danger" onClick={handleDeleteMovie}>
              Xóa
            </button>
          </>
        }
      >
        <p>
          Bạn có chắc chắn muốn xóa phim "{currentMovie?.title}"? Hành động này không thể hoàn tác.
        </p>
      </MovieModal>
    </div>
  );
};

export default Movies;
