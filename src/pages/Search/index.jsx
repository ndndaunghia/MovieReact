import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../../Components/CardItem';
import { useSearchParams } from 'react-router-dom';
import { fetchVideos } from '../../redux/slices/videosSlice';
import Loading from '../../Components/common/Loading/Loading';
import './search.css';

export default function Search() {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.videos);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  useEffect(() => {
    if (query) {
      // Sử dụng fetchVideos với tham số q để search
      dispatch(fetchVideos({ page: 1, perPage: 50, q: query }));
    }
  }, [dispatch, query]);

  // Hiển thị loading
  if (loading) {
    return (
      <div className="search-page">
        <div className="container">
          <Loading text={`Đang tìm kiếm "${query}"...`} />
        </div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="search-page">
        <div className="container">
          <h2 className="search-title">Đã xảy ra lỗi khi tìm kiếm</h2>
          <p className="search-message">{error?.message || "Không thể tìm kiếm. Vui lòng thử lại sau."}</p>
        </div>
      </div>
    );
  }

  // Hiển thị kết quả
  return (
    <div className="search-page">
      <div className="container">
        <h2 className="search-title">
          {videos && videos.length > 0 
            ? `Kết quả tìm kiếm cho "${query}" (${videos.length} phim)` 
            : `Không tìm thấy phim nào phù hợp với "${query}"`}
        </h2>
        
        {videos && videos.length > 0 ? (
          <div className="search-results">
            {videos.map((movie) => (
              <div key={movie._id || movie.id}>
                <CardItem movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <p className="search-message">Vui lòng thử lại với từ khóa khác hoặc duyệt qua danh mục phim của chúng tôi.</p>
        )}
      </div>
    </div>
  );
}
