import React from "react";
import Popular from "../PolularMovie";
import NowPlaying from "../NowPlaying";
import UpComing from "../Upcoming";
import Banner from "../Banner";

export default function HomeMovies() {
  return (
    <div>
      <Banner />
      <Popular /> 
      <NowPlaying />
      <UpComing />
    </div>
  );
}
