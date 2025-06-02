import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getvideo, getvideoAsync } from "../../movies";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { API_TOP_RATED } from "../../API";
import { useNavigate } from "react-router-dom";
import { fetchVideos } from "../../redux/slices/videosSlice";
import Loading from "../common/Loading/Loading";

const MAX_DESCRIPTION_LENGTH = 200;
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const BannerWrapper = styled.header`
  background-size: cover;
  /* background-image: url("https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg"); */
  background-position: "center center";
  position: relative;
  height: 620px;
  color: white;
  object-fit: contain;
  opacity: 0.8;
`;

const BannerContent = styled.div`
  margin-left: 50px;
  padding-top: 200px;
  height: 190px;
`;

const BannerTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  padding-top: 0.3rem;
  color: "white";
`;

const BannerDescription = styled.h1`
  width: 45rem;
  line-height: 1.5;
  padding-top: 1rem;
  font-size: 0.8rem;
  max-width: 360px;
  height: 80px;
`;

const BannerButtons = styled.div`
  margin-top: 2.5rem;
`;

const BannerButton = styled.button`
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background-color: rgba(51, 51, 51, 0.5);

  :hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }
`;

export default function Banner() {
  const { videos, loading, totalVideos, currentPage, perPage } =
  useSelector((state) => state.videos);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
     dispatch(fetchVideos({ page, perPage, q: '' }));
   }, [dispatch, page, perPage]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  //   console.log(IMAGE_URL + videos[0]?.backdrop_path);
  if (loading && !videos?.length) {
    return <Loading fullScreen text="Đang tải dữ liệu phim..." />;
  }

  // random thứ tự của videos
  const shuffledVideos = [...videos].sort(() => 0.5 - Math.random());
  return (
    <Slider {...settings}>
      {shuffledVideos?.map((video) => {
        return (
          <div key={video._id}>
            <BannerWrapper
              key={video._id}
              style={{
                backgroundImage: `url(${video.banner_url})`,
              }}
            >
              <BannerContent>
                <BannerTitle>{video.name}</BannerTitle>
                <BannerDescription>
                  {video.description.length > MAX_DESCRIPTION_LENGTH
                    ? `${video.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                    : video.description}
                </BannerDescription>
                <BannerButtons>
                  <BannerButton
                    onClick={() => {
                      navigate(`/movie-detail/${video._id}`);
                    }}
                  >
                    Xem chi tiết
                    <span className="material-symbols-outlined text-center">info</span>
                  </BannerButton>
                  {/* <BannerButton>Thêm vào danh sách</BannerButton> */}
                </BannerButtons>
              </BannerContent>
            </BannerWrapper>
          </div>
        );
      })}
    </Slider>
  );
}
