import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from '../CardItem';
import './style.css'
export default function MovieSlider(props) {
    const { movies } = props;
    const settings = {
        dots: false,
        // infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        // autoplay: true,
        // autoplaySpeed: 4000,
        // arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: false
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false
            },
          },
        ],
      };
      
    
    return (
        <div className='text-center'>
            <Slider {...settings}>
                {movies && movies.map((movie) => (
                    <CardItem key={movie.id} movie={movie} />
                ))}
            </Slider>
        </div>
    )
}
