import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../API";
import CardItem from "../../Components/CardItem";
import styled from "styled-components";

const ButtonC = styled.button`
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#000" : "white")};
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid white;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: white;
    color: #000;
  }
`;

export default function AllMovies() {
  const [allmovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBack = () => {
    if(currentPage === 1)
        return;
    else
        setCurrentPage(currentPage - 1);
  }

  const handlNext = () => {
    if(currentPage === 3)
        return;
    else
        setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=vi-VN&page=${currentPage}&${API_KEY}`
      )
      .then((res) => {
        setAllMovies(res.data.results);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  return (
    <div className="container">
      <div className="row">
        <h2
          className="text-center"
          style={{ color: "#ffff", paddingTop: "100px" }}
        >
          Danh sách phim
        </h2>
      </div>
      <div className="row">
        <div className="row row-cols-2 row-cols-lg-4">
          {allmovies.map((movie) => (
            <div className="col" key={movie.id}>
              <CardItem movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center gap-2">
          <ButtonC
            
            onClick={handleBack}
          >
            {"<"}
          </ButtonC>
          <ButtonC
            active={currentPage === 1}
            onClick={() => handlePageClick(1)}
          >
            1
          </ButtonC>
          <ButtonC
            active={currentPage === 2}
            onClick={() => handlePageClick(2)}
          >
            2
          </ButtonC>
          <ButtonC
            active={currentPage === 3}
            onClick={() => handlePageClick(3)}
          >
            3
          </ButtonC>
          <ButtonC
            onClick={handlNext}
          >
            {">"}
          </ButtonC>
        </div>
      </div>
    </div>
  );
}
