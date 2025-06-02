import React, { useEffect, useMemo } from "react";
import MovieSlider from "../MovieSlider";
import { useDispatch, useSelector } from "react-redux";
import { getUpComingAsync } from "../../movies/upcoming";
import Loading from "../common/Loading/Loading";

export default function UpComing() {
  const { videos, loading, error, hasInitialFetch } = useSelector(
    (state) => state.videos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Chỉ fetch nếu chưa fetch lần nào
    // if (!hasInitialFetch) {
    //   dispatch(fetchVideos({ page: 1, perPage: 20, q: "" }));
    // }
  }, [dispatch, hasInitialFetch]); // Phụ thuộc vào hasInitialFetch

  // Tính toán random videos trực tiếp trong useMemo
  const popularMovies = useMemo(() => {
    if (!videos || videos.length === 0) return [];

    const count = 6;
    if (videos.length <= count) return videos;

    // Random với seed cố định dựa trên videos.length để kết quả ổn định
    const shuffled = [...videos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, [videos]); // Chỉ phụ thuộc vào videos

  // if (loading && (!videos || videos.length === 0)) {
  //   return (
  //     <div className="container mt-5">
  //       <h2 className="mb-5" style={{ color: "#ffff" }}>
  //         Sắp chiếu
  //       </h2>
  //       <Loading text="Đang tải phim sắp chiếu..." />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="container mt-5">
        <h2 className="mb-5" style={{ color: "#ffff" }}>
          Sắp chiếu
        </h2>
        <p style={{ color: "#ffff" }}>Không thể tải danh sách phim</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-5" style={{ color: "#ffff" }}>
        Sắp chiếu
      </h2>
      {popularMovies.length > 0 ? (
        <MovieSlider movies={popularMovies} />
      ) : (
        <p style={{ color: "#ffff" }}>Không có phim nào để hiển thị</p>
      )}
    </div>
  );
}
