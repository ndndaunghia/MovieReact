import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/slices/videosSlice';
import CardItem from '../../Components/CardItem';
import './style.css';
import Loading from '../../Components/common/Loading/Loading';
import Pagination from '../../Components/Pagination/Pagination';

export default function CategoryMovies() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videos, loading, error, totalVideos, currentPage, perPage } = useSelector((state) => state.videos);
  const { categories } = useSelector((state) => state.categories);
  
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    perPage: 10,
  });

  // Tìm tên category từ ID
  useEffect(() => {
    if (categories && categories.length > 0 && categoryId) {
      const category = categories.find(cat => cat._id === categoryId);
      setCurrentCategory(category);
    } else if (!categoryId) {
      setCurrentCategory({ name: 'Tất cả phim' });
    }
  }, [categories, categoryId]);

  // Load videos theo category
  useEffect(() => {
    const params = {
      ...searchParams,
    };
    
    if (categoryId) {
      params.category_id = categoryId;
    }
    
    dispatch(fetchVideos(params));
  }, [dispatch, categoryId, searchParams]);

  // Xử lý phân trang
  const handlePageChange = (page) => {
    setSearchParams(prev => ({
      ...prev,
      page,
    }));
    
    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="category-movies-page">
      <div className="container">
        <div className="category-header">
          <h1>{currentCategory ? currentCategory.name : 'Đang tải...'}</h1>
          
          {/* Dropdown chọn thể loại */}
          <div className="category-filter">
            <select 
              value={categoryId || ''} 
              onChange={(e) => navigate(e.target.value ? `/category/${e.target.value}` : '/all-movies')}
              className="form-select"
            >
              <option value="">Tất cả phim</option>
              {categories && categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hiển thị phim */}
        {loading ? (
          <Loading text="Đang tải phim..." />
        ) : error ? (
          <div className="error-message">
            <p>Đã xảy ra lỗi: {error.message || 'Không thể tải danh sách phim'}</p>
          </div>
        ) : (
          <>
            {videos && videos.length > 0 ? (
              <>
                <div className="movies-grid">
                  {videos.map(movie => (
                    <div className="movie-item" key={movie._id || movie.id}>
                      <CardItem movie={movie} />
                    </div>
                  ))}
                </div>
                
                {/* Hiển thị phân trang nếu có nhiều phim */}
                {totalVideos > perPage && (
                  <div className="pagination-container">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalVideos / perPage)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="no-movies">
                <p>Không tìm thấy phim nào trong thể loại này</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}