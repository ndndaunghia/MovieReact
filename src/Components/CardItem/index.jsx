import React from "react";
import styled from "styled-components";
import './style.css'
import { Link } from "react-router-dom";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

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
  const { poster_path, title, vote_average, id } = props.movie;

  return (
   <Link to={`movie-detail/${id}`}>
    <div className="card">
      <a href="#">
        <div className="img1" style={{backgroundImage: `url(${IMAGE_URL + poster_path})`}}></div>
        <div className="img2" style={{backgroundImage: `url(${IMAGE_URL + poster_path})`}}></div>
        <div className="text">
          {title}
        </div>
        <a href="#">
          <div className="catagory">
            Rating <i className="fas fa-film"></i>
          </div>
        </a>
        <a href="#">
          <div className="views">
            {vote_average} <i className="far fa-eye"></i>{" "}
          </div>
        </a>
      </a>
    </div></Link>
  );
}
