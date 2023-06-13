import React, { useEffect } from 'react'
import MovieSlider from '../MovieSlider'
import { useDispatch, useSelector } from 'react-redux'
import { getUpComingAsync } from '../../movies/upcoming';

export default function UpComing() {
  const upComing = useSelector((state) => state.upComing.upComing);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUpComingAsync());
  })
  return (
    <div className='container'>
        <h2 className="my-5" style={{ color: "#ffff" }}>Sắp chiếu</h2>
        <MovieSlider movies={upComing}></MovieSlider>
    </div>
  )
}
