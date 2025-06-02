import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from '../CardItem';
import './style.css'

export default function MovieSlider(props) {
    const { movies } = props;

    // Nếu không có movies thì không render
    if (!movies || movies.length === 0) {
        return (
            <div className="text-center" style={{ color: '#fff' }}>
                <p>Không có phim nào để hiển thị</p>
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true, // Luôn cho phép infinite để có slider
        speed: 500,
        slidesToShow: 4, // Hiển thị 4 phim trên màn hình lớn
        slidesToScroll: 1, // Scroll từng phim một để mượt mà hơn
        arrows: true, // Hiển thị nút next/prev
        responsive: [
            {
                breakpoint: 1200, // Desktop nhỏ
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Tablet
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true // Vẫn giữ arrows trên tablet
                },
            },
            {
                breakpoint: 480, // Mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false, // Ẩn arrows trên mobile để tiết kiệm không gian
                    dots: true // Thêm dots cho mobile
                },
            },
        ],
    };
    
    return (
        <div className='movie-slider-container'>
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie._id || movie.id} className="slider-item">
                        <CardItem movie={movie} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
