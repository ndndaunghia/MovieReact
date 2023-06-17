import React from 'react'
import { useSelector } from 'react-redux';
import CardItem from '../../Components/CardItem';
import { useParams } from 'react-router-dom';
import { getSearchAsync, watchGetSearchSaga } from '../../movies/search';

export default function Search(props) {
  const movies = useSelector((state) => state.search.search);
  const {query} = useParams();
  console.log(query);
  if(movies.length !== 0 ) {
    return (
      <div className="container">
         <div className="row">
          <h2 style={{color: '#ffff', paddingTop: '100px'}} className="text-center">Danh sách phim bạn tìm có {movies.length} phim </h2>
        </div>
        <div className="row row-cols-2 row-cols-lg-4">
          {movies.map((movie) => (
            <div className="col">
              <CardItem movie={movie}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container">
        <div className="row">
          <h2 style={{color: '#ffff', paddingTop: '100px'}} className="text-center">Không tìm thấy bộ phim theo yêu cầu</h2>
        </div>
      </div>
    )
  }
}
