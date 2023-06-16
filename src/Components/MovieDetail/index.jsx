import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAsync } from "../../movies/moviedetail";
export default function MovieDetail() {
  const { id } = useParams();
  const IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const movieDetail = useSelector((state) => state.movieDetail.movieDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetailAsync({ id }));
  }, []);

  console.log(movieDetail);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
           <button className="button my-5">Xem ngay</button>
           <button className="button my-5">Thêm vào danh sách</button>
          </div>
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
