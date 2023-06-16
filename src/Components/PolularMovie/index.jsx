import React, { useEffect } from "react";
import MovieSlider from "../MovieSlider";
import { useDispatch, useSelector } from "react-redux";
import { getPopular, getPopularAsync } from "../../movies/popular";
import axios from "axios";
import { API_POPULAR } from "../../API";

export default function Popular() {
  const popular = useSelector((state) => state.popular.popular);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularAsync());
  }, []);
  return(
    <div className="container mt-5">
        <h2 className="mb-5" style={{color: '#ffff'}}>Phổ biến</h2>
        <MovieSlider movies={popular}></MovieSlider>
    </div>
  );
}
