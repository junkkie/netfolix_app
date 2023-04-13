import React, { useEffect, useState } from 'react'
import axios from '../API/axios';
import requests from '../API/requests';
import 'styles/banner.css'
import styled from 'styled-components';

function Banner() {
  const [movie, setMovie] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  const fetchData = async() =>{
    // 영화 id 가져오기
    const request = await axios.get(requests.fetchNowPlaying); // axios.js를 axios라는 이름으로 사용하는 중, requests.js의 키값을 axios.get으로 불러옴
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length + 0)].id // results[0~19] 중 랜덤 추출(request 안의 data 속성 안의 results 속성안의 배열)
    // 영화 상세정보 가져오기
    // https://api.themoviedb.org/3/movie/157336?api_key={api_key}&d어쩌고
    const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{
      params : {append_to_response : "videos"}
    });
    console.log("movieDetail >", movieDetail)
    setMovie(movieDetail);
  }

  useEffect(() =>{
    fetchData();
  },[])

  const truncate = (str, n) =>{
    return str?.length > n ? str.substr(0, n - 1) + "..." : str; // str의 글자 개수가 n보다 클 경우 0번부터 n-1번까지의 문자열을 내보내겠다(true), 그렇지 않으면 그대로 내보내겠다(false) -p태그에서 n이 100으로 정의되기 때문에 100 이상만 true
          // ? : 값이 존재하지 않아도(null) 에러가 발생하지 않는다. optional 연산자
  }

  if(!isClicked){
    return (
        <header className='banner'
        style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, backgroundPosition:'top center', backgroundSize:'cover'}}>
          <div className='banner_contents'>
            <h1 className='banner_title'>
              {movie.title || movie.name || movie.original_name}  {/* API의 영화들 제목의 키값이 다를 수 있기 때문에... null 병합 연산자 */}
            </h1>
            <div className='banner_buttons'>
              <button className='banner_button play' onClick={() =>setIsClicked(true)}>
                play
              </button>
              <button className='banner_button info'>
                More Information
              </button>
            </div>
            <p className='banner_description'>
              {truncate(movie.overview, 100)}
            </p>
          </div>
          <div className='banner_fadeBottom'></div>
        </header>
      )
    } else{
    return(
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            width='640'
            height='360'
            frameborder='0'
            allow='autoplay; fullsreeen;'
          >
          </Iframe>
        </HomeContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  &::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default Banner