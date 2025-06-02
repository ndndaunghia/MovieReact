import React from "react";
import styled from "styled-components";
import "./style.css";
import { Link } from "react-router-dom";

// Không cần IMAGE_URL nữa vì dùng trực tiếp từ API
const CardItemImg = styled.div`
  img {
    border-radius: 30px;
    padding: 10px;
    width: 200px !important;
    height: auto;
    object-fit: cover;
    overflow: hidden;
    transition: transform 0.3s ease-in;
    filter: brightness(100%);
  }
  &:hover {
    img {
      filter: brightness(70%);
    }
  }
`;

const CardItemContent = styled.div`
  width: 180px;
  position: absolute;
  z-index: 4234;
  height: 50px;
  bottom: 10px;
  border-radius: 0 0 20px 20px;
  transition: 0.5 ease-in-out;
  transform-origin: bottom;
  background-color: #000;
  opacity: 0.6;
  display: none;
`;

const CardItemContentActions = styled.div`
  top: 10px;
  position: absolute;
  width: 100%;
`;

const CardItemContentAction = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 24px;
`;

const CardItemC = styled.div`
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.25);
  &:hover ${CardItemContent} {
    display: block;
    transition: 0.5s ease-in-out;
  }
`;

export default function CardItem(props) {
  const { movie } = props;

  // Handle both TMDB format and your API format
  const movieData = {
    id: movie._id || movie.id,
    title: movie.name || movie.title,
    poster: movie.thumbnail_url || movie.poster_path,
  };

  // Fallback image nếu không có poster
  const posterImage = movieData.poster || "/placeholder.svg";
  // random rating type float like 7.8 9.2
  const randomRating = (Math.random() * 10).toFixed(1);

  return (
    <Link to={`/movie-detail/${movieData.id}`}>
      <div className="card">
        <div
          className="img1"
          style={{ backgroundImage: `url(${posterImage})` }}
        ></div>
        <div
          className="img2"
          style={{ backgroundImage: `url(${posterImage})` }}
        ></div>
        <div className="text">{movieData.title || "Không có tên"}</div>
        <div className="catagory">
          Rating <i className="fas fa-film"></i>
        </div>
        <div className="views">
          {randomRating}
          <i className="far fa-eye"></i>
        </div>
      </div>
    </Link>
  );
}
