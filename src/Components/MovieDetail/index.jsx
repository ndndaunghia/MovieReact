import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAsync } from "../../movies/moviedetail";
import {
  addToFavoriteAsync,
  getFavoriteAsync,
  removeFavoriteAsync,
} from "../../movies/favorite";
import { firebaseAppPromise } from "../../Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import { API_KEY, BASE_URL } from "../../API";
import { Alert, Snackbar } from "@mui/material";

export default function MovieDetail() {
  const { id } = useParams();
  const IMAGE_URL = "https://image.tmdb.org/t/p/original";
  const VID_URL = BASE_URL + id + `/videos?language=en-US&` + API_KEY;
  var TRAILER = "https://www.youtube.com/embed/";
  const movieDetail = useSelector((state) => state.movieDetail.movieDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isInFavorite, setIsInFavorite] = useState(false);
  const [iFrame, setIFrame] = useState(false);
  const [trailer, setTrailer] = useState("https://www.youtube.com/embed/");
  const [showSuccessAddAlert, setShowSuccessAddAlert] = useState(false);
  const [showSuccessRemoveAlert, setShowSuccessRemoveAlert] = useState(false);
  const isLoggedIn = localStorage.getItem("at") ? true : false;

  useEffect(() => {
    axios
      .get(VID_URL)
      .then((res) => {
        // console.log(res.data.results);
        const getLinkTrailer = res.data.results.filter(
          (trailer) => trailer.name === "Official Trailer"
        );
        const trailerKey = getLinkTrailer[0].key;
        const newTrailer = "https://www.youtube.com/embed/" + trailerKey;
        setTrailer(newTrailer);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("uid");
        const firebaseApp = await firebaseAppPromise;
        const database = getDatabase(firebaseApp);
        const favoriteRef = ref(database, `${userId}/list`);

        onValue(favoriteRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const keys = Object.keys(data);
            const isFavorite = keys.includes(id);
            setIsInFavorite(isFavorite);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    dispatch(getMovieDetailAsync({ id }));
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("at") ? true : false;
    if (isLoggedIn) {
      dispatch(getFavoriteAsync());
    }
  }, []);

  useEffect(() => {
    setIsInFavorite(isInFavorite);
  }, [isInFavorite]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToFavorite = () => {
    if (isLoggedIn) {
      if (isInFavorite) {
        dispatch(removeFavoriteAsync(movieDetail.id));
        setShowSuccessRemoveAlert(true);
      } else {
        dispatch(addToFavoriteAsync({ movieDetail: movieDetail }));
        setShowSuccessAddAlert(true);
      }
      setIsInFavorite(!isInFavorite);
    } else {
      return navigate("/sign-in");
    }
  };

  const handleIFrame = () => {
    if (isLoggedIn) setIFrame(!iFrame);
    else return navigate("/sign-in");
  };

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0,0,0,0.8)), url(${
          IMAGE_URL + movieDetail.backdrop_path
        })`,
      }}
    >
      <div className="container">
        <img src="" alt="" />
      </div>
      <div className="container movie-detail">
        <div className="row">
          <div className="col-md-6 left-box">
            <h1>{movieDetail.title}</h1>
            <p>{movieDetail.overview}</p>
            <p>
              Xuất bản:{" "}
              <span style={{ fontSize: "12px" }}>
                {movieDetail.release_date}
              </span>
            </p>
            <p>Thể loại</p>
            <div className="genres d-flex gap-4">
              {movieDetail &&
                movieDetail.genres &&
                movieDetail.genres.map((genre) => (
                  <a key={genre.id} href="">
                    {genre.name}
                  </a>
                ))}
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
                  height: "440px",
                }}
              >
                <iframe
                  src={trailer}
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <button className="button my-5" onClick={handleAddToFavorite}>
              {isInFavorite ? "Xóa khỏi danh sách" : "Thêm vào danh sách"}
            </button>
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
              src={IMAGE_URL + movieDetail.poster_path}
              alt=""
              className="movie-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}