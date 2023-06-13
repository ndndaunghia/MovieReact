import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingAsync } from "../../movies/nowplaying";
import MovieSlider from "../MovieSlider";

export default function () {
  const nowPlaying = useSelector((state) => state.nowPlaying.nowPlaying);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNowPlayingAsync());
  }, []);
  return (
    <div className="container">
      <h2 className="my-5" style={{ color: "#ffff" }}>
        Đang phát
      </h2>
      <MovieSlider movies={nowPlaying}></MovieSlider>
    </div>
  );
}
