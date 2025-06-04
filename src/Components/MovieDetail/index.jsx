import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { fetchVideoById } from "../../redux/slices/videosSlice";
import { fetchCategoryById } from "../../redux/slices/categoriesSlice";
import Loading from "../common/Loading/Loading";

export default function MovieDetail() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { currentVideo, loading } = useSelector((state) => state.videos);
  const { currentCategory } = useSelector((state) => state.categories);
  const isLoggedIn = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [iFrame, setIFrame] = useState(false);
  const [showSuccessAddAlert, setShowSuccessAddAlert] = useState(false);
  const [showSuccessRemoveAlert, setShowSuccessRemoveAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchVideoById(id));
  }, [dispatch, id]);

  // Fixed: Only fetch category when currentVideo data is available and has category_id
  useEffect(() => {
    if (currentVideo?.data?.category_id) {
      dispatch(fetchCategoryById(currentVideo.data.category_id));
    }
  }, [dispatch, currentVideo?.data?.category_id]); // Added dependency on category_id specifically

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIFrame = () => {
    if (isLoggedIn) setIFrame(!iFrame);
    else return navigate("/sign-in");
  };

  if (loading && !currentVideo?.data) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.8)), url(${currentVideo?.data.banner_url})`,
      }}
    >
      <div className="container">
        <img src="" alt="" />
      </div>
      <div className="container movie-detail">
        <div className="row">
          <div className="col-md-6 left-box">
            <h1>{currentVideo?.data.name}</h1>
            <p>{currentVideo?.data.description}</p>
            <p>
              Xuất bản: <span style={{ fontSize: "12px" }}>05/10/2023</span>
            </p>
            <p>Thể loại</p>
            <div className="genres d-flex gap-4">
              {currentCategory?.data?.name}
            </div>
            <div className="casting">
              <img src="" alt="" />
            </div>
            {iFrame ? (
              <button className="button my-5" onClick={handleIFrame}>
                Bỏ xem
              </button>
            ) : (
              <button className="button my-5" onClick={handleIFrame}>
                Xem ngay
              </button>
            )}
            {iFrame && (
              <div
                class="ratio ratio-16x9 position-absolute"
                style={{
                  top: "20%",
                  left: "25%",
                  width: "50%",
                  // height: "440px",
                }}
              >
                <video controls>
                  <source
                    src={currentVideo?.data?.video_url}
                    type="video/mp4"
                  />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </div>
            )}
          </div>
          <Snackbar
            open={showSuccessAddAlert}
            autoHideDuration={800}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={() => setShowSuccessAddAlert(false)}
          >
            <Alert
              onClose={() => setShowSuccessAddAlert(false)}
              severity="success"
            >
              Thêm vào danh sách thành công!
            </Alert>
          </Snackbar>
          <Snackbar
            open={showSuccessRemoveAlert}
            autoHideDuration={800}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={() => setShowSuccessRemoveAlert(false)}
          >
            <Alert
              onClose={() => setShowSuccessRemoveAlert(false)}
              severity="success"
            >
              Xóa khỏi danh sách thành công!
            </Alert>
          </Snackbar>
          <div className="col-md-6 text-center">
            <img
              src={currentVideo?.data.thumbnail_url}
              alt=""
              className="movie-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
