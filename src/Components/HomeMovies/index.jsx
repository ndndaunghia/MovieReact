import React, { useEffect } from "react";
import Popular from "../PolularMovie";
import NowPlaying from "../NowPlaying";
import UpComing from "../Upcoming";
import Banner from "../Banner";

export default function HomeMovies() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Banner />
      <Popular /> 
      <NowPlaying />
      <UpComing />
    </div>
  );
}
