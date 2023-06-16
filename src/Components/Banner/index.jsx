import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { getTopRated, getTopRatedAsync } from '../../movies';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import { API_TOP_RATED } from '../../API';

const MAX_DESCRIPTION_LENGTH = 150;
const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

const BannerWrapper = styled.header`
    background-size: cover;
    /* background-image: url("https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg"); */
    background-position: 'center center';
    position: relative;
    height: 620px;
    color: white;
    object-fit: contain;
    opacity: 0.9;
`

const BannerContent = styled.div`
    margin-left: 50px;
    padding-top: 200px;
    height: 190px;
`

const BannerTitle = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    padding-top: 0.3rem;
    color: 'white';
`

const BannerDescription = styled.h1`
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
`

const BannerButtons = styled.div`

`

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
    background-color: rgba(51, 51, 51, 0.5);

    :hover{
        color: #000;
        background-color: #e6e6e6;
        transition: all 0.2s;
    }
`

export default function Banner() {
    const topRateds = useSelector((state) => state.topRated.topRated);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopRatedAsync());
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };
    //   console.log(IMAGE_URL + topRateds[0]?.backdrop_path);
  return (
   <Slider {...settings}>
    {topRateds.map((topRated) => {
    return(
       <div key={topRated.id}>
       <BannerWrapper 
        key={topRated.id}
        style={{ backgroundImage: `url(${IMAGE_URL + topRated?.backdrop_path})`}}>
        <BannerContent>
            <BannerTitle>{topRated.title}</BannerTitle>
            <BannerDescription>
            {topRated.overview.length > MAX_DESCRIPTION_LENGTH
                ? `${topRated.overview.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                : topRated.overview
            }
        </BannerDescription>
            <BannerButtons>
                <BannerButton>Xem nhanh</BannerButton>
                <BannerButton>Thêm vào danh sách</BannerButton>
            </BannerButtons>
        </BannerContent>
    </BannerWrapper>
       </div>
    )
    })}
   </Slider>

  )
}
