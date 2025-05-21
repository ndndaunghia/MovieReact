import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./Movies.css"
import MovieModal from "./MovieModal"
import { useCloudinary } from "../../../hooks/useCloudinary"
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESENT_NAME } from "../../../utils/cloudinary-config"
import {
  fetchVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  clearError,
} from "../../../redux/slices/videosSlice"
import { fetchCategories } from "../../../redux/slices/categoriesSlice"
import Loading from "../../../Components/common/Loading/Loading"
import FileUploadLoading from "../../../Components/common/FileUploadLoading/FileUploadLoading"
import toast, { Toaster } from "react-hot-toast"

const Movies = () => {
  const dispatch = useDispatch()
  const { videos, loading, error, totalVideos, currentPage, perPage } = useSelector((state) => state.videos)
  const { categories } = useSelector((state) => state.categories)

  // State cho loading
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingText, setProcessingText] = useState("Đang xử lý...")

  // State cho tìm kiếm và phân trang
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [page, setPage] = useState(1)

  // State cho modal
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [currentMovie, setCurrentMovie] = useState(null)

  // State cho form
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    thumbnail_url: "",
    video_url: "",
    banner_url: "",
    description: "",
  })

  // State cho preview
  const [imagePreview, setImagePreview] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  // State cho validation
  const [errors, setErrors] = useState({})

  const { uploadImage, uploadVideo, isUploading } = useCloudinary({
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_PRESENT_NAME,
  })

  // State cho từng field đang upload
  const [uploadingFields, setUploadingFields] = useState({
    thumbnail_url: false,
    banner_url: false,
    video_url: false
  });

  // Fetch videos khi trang, perPage hoặc searchTerm thay đổi
  useEffect(() => {
    dispatch(fetchVideos({ page, perPage, searchTerm: debouncedSearchTerm }))
  }, [dispatch, page, perPage, debouncedSearchTerm])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Hiển thị thông báo lỗi từ Redux store
  useEffect(() => {
    if (error) {
      toast.error(error.detail.description || "Có lỗi xảy ra, vui lòng thử lại!")
      dispatch(clearError()) // Xóa lỗi sau khi hiển thị
    }
  }, [error, dispatch])

  // Debounce searchTerm để tránh gọi API quá nhiều lần
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setPage(1) // Reset về trang 1 khi tìm kiếm
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Xử lý phân trang
  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  // Tạo mảng các trang để hiển thị
  const totalPages = Math.ceil(totalVideos / perPage)
  const pageNumbers = []
  const maxPageButtons = 5

  if (totalPages <= maxPageButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    if (startPage > 1) {
      pageNumbers.push(1)
      if (startPage > 2) pageNumbers.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push('...')
      pageNumbers.push(totalPages)
    }
  }

  // Xử lý thay đổi form text input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // Xử lý thay đổi form file input với loading cho từng field
  const handleFileChange = async (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      try {
        setUploadingFields({
          ...uploadingFields,
          [name]: true
        });
        
        let uploadResult;
        if (name === "video_url") {
          uploadResult = await uploadVideo(files[0]);
        } else {
          uploadResult = await uploadImage(files[0]);
        }

        if (uploadResult) {
          setFormData({
            ...formData,
            [name]: uploadResult.secure_url,
          });

          if (name === "thumbnail_url") {
            setImagePreview(uploadResult.secure_url);
          } else if (name === "banner_url") {
            setBannerPreview(uploadResult.secure_url);
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
        setErrors({
          ...errors,
          [name]: "Lỗi khi tải lên file",
        });
      } finally {
        setUploadingFields({
          ...uploadingFields,
          [name]: false
        });
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên phim";
    }

    if (!formData.banner_url) {
      newErrors.banner_url = "Vui lòng chọn hình ảnh banner";
    }

    if (!formData.video_url) {
      newErrors.video_url = "Vui lòng chọn file video";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý thêm phim mới
  const handleAddMovie = async () => {
    if (!validateForm()) return

    try {
      setIsProcessing(true)
      setProcessingText("Đang thêm phim mới...")
      
      await dispatch(createVideo(formData)).unwrap()
      await dispatch(fetchVideos({ page, perPage, searchTerm: debouncedSearchTerm }))
      
      setShowAddModal(false)
      resetForm()
      toast.success("Thêm phim mới thành công!")
    } catch (error) {
      console.error("Error adding movie:", error)
      // toast.error("Lỗi khi thêm phim mới!")
    } finally {
      setIsProcessing(false)
    }
  }

  // Xử lý cập nhật phim
  const handleUpdateMovie = async () => {
    if (!validateForm()) return

    try {
      setShowEditModal(false)

      setIsProcessing(true)
      setProcessingText("Đang cập nhật phim...")
      
      await dispatch(updateVideo({ id: currentMovie._id, videoData: formData })).unwrap()
      await dispatch(fetchVideos({ page, perPage, searchTerm: debouncedSearchTerm }))
      
      toast.success("Cập nhật phim thành công!")
    } catch (error) {
      resetForm()
      console.error("Error updating movie:", error)
      // toast.error("Lỗi khi cập nhật phim!")
    } finally {
      setIsProcessing(false)
    }
  }

  // Xử lý xóa phim
  const handleDeleteMovie = async () => {
    try {
      setShowDeleteModal(false)

      setIsProcessing(true)
      setProcessingText("Đang xóa phim...")
      
      await dispatch(deleteVideo(currentMovie._id)).unwrap()
      await dispatch(fetchVideos({ page, perPage, searchTerm: debouncedSearchTerm }))
      
      toast.success("Xóa phim thành công!")
    } catch (error) {
      console.error("Error deleting movie:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      category_id: "",
      name: "",
      thumbnail_url: "",
      video_url: "",
      banner_url: "",
      description: "",
    })
    setImagePreview(null)
    setBannerPreview(null)
    setErrors({})
  }

  // Mở modal chỉnh sửa
  const openEditModal = (movie) => {
    setCurrentMovie(movie)
    setFormData({
      category_id: movie.category_id,
      name: movie.name,
      thumbnail_url: movie.thumbnail_url,
      video_url: movie.video_url,
      banner_url: movie.banner_url,
      description: movie.description,
    })
    setImagePreview(movie.thumbnail_url)
    setBannerPreview(movie.banner_url)
    setShowEditModal(true)
  }

  // Mở modal xem chi tiết
  const openViewModal = (movie) => {
    setCurrentMovie(movie)
    setShowViewModal(true)
  }

  // Mở modal xóa
  const openDeleteModal = (movie) => {
    setCurrentMovie(movie)
    setShowDeleteModal(true)
  }

  if (loading && !videos?.length) {
    return <Loading fullScreen text="Đang tải dữ liệu phim..." />
  }

  return (
    <div className="movies-page">
      {/* Thêm Toaster để hiển thị thông báo */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hiển thị loading overlay khi đang xử lý */}
      {isProcessing && <Loading fullScreen text={processingText} />}
      
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
            onChange={handleSearch} 
          />
        </div>
      </div>

      <div className="movies-table-container">
        <table className="movies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên phim</th>
              <th>Danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {videos?.length > 0 ? (
              videos.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie._id}</td>
                  <td>
                    <img src={movie.thumbnail_url || "/placeholder.svg"} alt={movie.name} className="movie-poster" />
                  </td>
                  <td className="movie-title">{movie.name}</td>
                  <td>{categories?.find(cat => cat._id === movie.category_id)?.name || "N/A"}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn view-btn" title="Xem chi tiết" onClick={() => openViewModal(movie)}>
                        👁️
                      </button>
                      <button className="action-btn edit-btn" title="Chỉnh sửa" onClick={() => openEditModal(movie)}>
                        ✏️
                      </button>
                      <button className="action-btn delete-btn" title="Xóa" onClick={() => openDeleteModal(movie)}>
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
                    ? "Không tìm thấy phim nào phù hợp" 
                    : "Chưa có phim nào trong hệ thống"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {totalVideos > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={page === 1} 
            onClick={() => handlePageChange(page - 1)}
          >
            « Trước
          </button>
          
          {pageNumbers.map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={pageNum}
                className={`pagination-btn ${page === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          ))}
          
          <button 
            className="pagination-btn"
            disabled={page === totalPages} 
            onClick={() => handlePageChange(page + 1)}
          >
            Sau »
          </button>
          
          <div className="pagination-info">
            Trang {page}/{totalPages}, Tổng số: {totalVideos} phim
          </div>
        </div>
      )}

      {/* Modal thêm phim mới */}
      <MovieModal
        isOpen={showAddModal}
        onClose={() => !isProcessing && !Object.values(uploadingFields).some(Boolean) && setShowAddModal(false)}
        title="Thêm phim mới"
        footer={
          <>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowAddModal(false)}
              disabled={isProcessing || Object.values(uploadingFields).some(Boolean)}
            >
              Hủy
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleAddMovie} 
              disabled={isProcessing || Object.values(uploadingFields).some(Boolean)}
            >
              Thêm mới
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Tên phim</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Danh mục</label>
          <select name="category_id" className="form-select" value={formData.category_id} onChange={handleChange}>
            <option value="">Chọn danh mục</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <div className="error-message">{errors.category_id}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Hình ảnh</label>
          <div className="file-input-container">
            <input
              type="file"
              name="thumbnail_url"
              className="form-file-input"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingFields.thumbnail_url}
            />
            {uploadingFields.thumbnail_url && (
              <FileUploadLoading text="Đang tải hình ảnh lên..." />
            )}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          {errors.thumbnail_url && <div className="error-message">{errors.thumbnail_url}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Hình ảnh banner</label>
          <div className="file-input-container">
            <input
              type="file"
              name="banner_url"
              className="form-file-input"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingFields.banner_url}
            />
            {uploadingFields.banner_url && (
              <FileUploadLoading text="Đang tải banner lên..." />
            )}
            {bannerPreview && (
              <div className="banner-preview">
                <img src={bannerPreview} alt="Banner Preview" />
              </div>
            )}
          </div>
          {errors.banner_url && <div className="error-message">{errors.banner_url}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Video</label>
          <div className="file-input-container">
            <input
              type="file"
              name="video_url"
              className="form-file-input"
              accept="video/*"
              onChange={handleFileChange}
              disabled={uploadingFields.video_url}
            />
            {uploadingFields.video_url && (
              <FileUploadLoading text="Đang tải video lên..." />
            )}
            {formData.video_url && <div className="file-name">Video đã được tải lên</div>}
          </div>
          {errors.video_url && <div className="error-message">{errors.video_url}</div>}
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
                setShowViewModal(false)
                openEditModal(currentMovie)
              }}
            >
              Chỉnh sửa
            </button>
          </>
        }
      >
        {currentMovie && (
          <div className="movie-detail">
            <div className="movie-detail-banner">
              <img
                src={currentMovie.banner_url || "/placeholder.svg"}
                alt={`Banner của ${currentMovie.name}`}
                className="movie-banner-image"
              />
            </div>

            <div className="movie-detail-header">
              <img
                src={currentMovie.thumbnail_url || "/placeholder.svg"}
                alt={currentMovie.name}
                className="movie-detail-poster"
              />
              <div className="movie-detail-info">
                <h2>{currentMovie.name}</h2>
                <p>
                  <strong>Danh mục:</strong>{" "}
                  {categories?.find((cat) => cat._id === currentMovie.category_id)?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="movie-description">
              <h4>Mô tả</h4>
              <p>{currentMovie.description || "Không có mô tả."}</p>
            </div>

            <div className="movie-video">
              <h4>Video</h4>
              <div className="video-container">
                <video controls width="100%">
                  <source src={currentMovie.video_url} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </div>
            </div>
          </div>
        )}
      </MovieModal>

      {/* Modal chỉnh sửa phim */}
      <MovieModal
        isOpen={showEditModal}
        onClose={() => !isProcessing && !Object.values(uploadingFields).some(Boolean) && setShowEditModal(false)}
        title="Chỉnh sửa phim"
        footer={
          <>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowEditModal(false)}
              disabled={isProcessing || Object.values(uploadingFields).some(Boolean)}
            >
              Hủy
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleUpdateMovie} 
              disabled={isProcessing || Object.values(uploadingFields).some(Boolean)}
            >
              Cập nhật
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Tên phim</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Mô tả</label>
          <textarea
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Danh mục</label>
          <select name="category_id" className="form-select" value={formData.category_id} onChange={handleChange}>
            <option value="">Chọn danh mục</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <div className="error-message">{errors.category_id}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Hình ảnh</label>
          <div className="file-input-container">
            <input
              type="file"
              name="thumbnail_url"
              className="form-file-input"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingFields.thumbnail_url}
            />
            {uploadingFields.thumbnail_url && (
              <FileUploadLoading text="Đang tải hình ảnh lên..." />
            )}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          {errors.thumbnail_url && <div className="error-message">{errors.thumbnail_url}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Hình ảnh banner</label>
          <div className="file-input-container">
            <input
              type="file"
              name="banner_url"
              className="form-file-input"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingFields.banner_url}
            />
            {uploadingFields.banner_url && (
              <FileUploadLoading text="Đang tải banner lên..." />
            )}
            {bannerPreview && (
              <div className="banner-preview">
                <img src={bannerPreview} alt="Banner Preview" />
              </div>
            )}
          </div>
          {errors.banner_url && <div className="error-message">{errors.banner_url}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Video</label>
          <div className="file-input-container">
            <input
              type="file"
              name="video_url"
              className="form-file-input"
              accept="video/*"
              onChange={handleFileChange}
              disabled={uploadingFields.video_url}
            />
            {uploadingFields.video_url && (
              <FileUploadLoading text="Đang tải video lên..." />
            )}
            {formData.video_url && <div className="file-name">Video đã được tải lên</div>}
          </div>
          {errors.video_url && <div className="error-message">{errors.video_url}</div>}
        </div>
      </MovieModal>

      {/* Modal xác nhận xóa phim */}
      <MovieModal
        isOpen={showDeleteModal}
        onClose={() => !isProcessing && setShowDeleteModal(false)}
        title="Xác nhận xóa"
        footer={
          <>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowDeleteModal(false)}
              disabled={isProcessing}
            >
              Hủy
            </button>
            <button 
              className="btn btn-danger" 
              onClick={handleDeleteMovie}
              disabled={isProcessing}
            >
              Xóa
            </button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn xóa phim "{currentMovie?.name}"? Hành động này không thể hoàn tác.</p>
      </MovieModal>
    </div>
  )
}

export default Movies