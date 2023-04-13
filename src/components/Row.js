import axios from 'API/axios';
import React, { useEffect, useState } from 'react'
import 'styles/row.css'
import MovieModal from './MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  
  useEffect(() =>{
    fetchMovieData();
  },[fetchUrl]); //App 컴포넌트에서 Row컴포넌트를 불러올 때 fetchUrl값이 모두 다르기 때문에 그 값이 바뀔 때마다 useEffect가 실행되어야 한다
  
  const fetchMovieData = async () =>{  
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    // console.log(request);
  }

  const handleClick = (movie) =>{ 
    setModalOpen(true); 
    setMovieSelected(movie);
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation //arrow버튼 사용할 때
      pagination={{ clickable: true }} //페이지버튼 사용할 때
      loop={true} //무한루프
      breakpoints={{
        1378:{slidesPerView: 6, slidesPerGroup: 6},
        998:{slidesPerView: 5, slidesPerGroup: 5},
        625:{slidesPerView: 4, slidesPerGroup: 4},
        0:{slidesPerView: 3, slidesPerGroup: 3}
      }} //{객{속성:키값}체}
      >
      <div className='row_posters' key={id}>
        {movies.map((movie) => (
          <SwiperSlide>
            <img
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
            key={movie.id}
            onClick={()=>handleClick(movie)}
            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            loading='lazy'
            alt={movie.title || movie.name || movie.original_name}
            />
          </SwiperSlide>
        ))}
      </div>
      </Swiper>


      {/* <div className='slider'>
        <div className='slider_arrow left'>
          <span className='arrow' onClick={()=>{document.getElementById(id).scrollLeft-=(window.innerWidth - 80)}}> 
            {"<"}
          </span>
        </div>
        <div className='row_posters' id={id}>
          {movies.map((movie) => (
            <SwiperSlide>
              <img
              className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
              key={movie.id}
              onClick={()=>handleClick(movie)}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading='lazy'
              alt={movie.title || movie.name || movie.original_name}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className='slider_arrow right'>
          <span className='arrow' onClick={()=>{document.getElementById(id).scrollLeft+=(window.innerWidth - 80)}}>
            {">"}
          </span>
        </div>
      </div> */}

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  )
}

export default Row