import axios from 'API/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function DetailPage() {
  const [movie, setMovie] = useState({});
  let {movieId} = useParams(); //param값 가져오기. app 컴포넌트 참고
  console.log("movieId >",movieId)

  useEffect(() => {
    fetchData();
  }, [movieId]);

  const fetchData = async () => { //astnc await은 useEffect 안에 넣으면 안 된다
    const request = await axios.get(`/movie/${movieId}`);
    setMovie(request.data); //영화 데이터 가져와서 movie객체에 넣기
  }

  if(!movie) return <div>...loading</div>; //영화 정보 없을 경우 띄울 것

  return (
    <Container>
      <BackImg src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title || movie.name || movie.original_name} />
      <BackBG>
        <Contents>
          <ReleaseDate>{movie.release_date ? movie.release_date : movie.first_air_date}</ReleaseDate>
          <Title>{movie.title ? movie.title : movie.name}</Title>
          <VoteAvg>평점: {movie.vote_average}</VoteAvg>
          <Overview>{movie.overview}</Overview>
        </Contents>  
        {/* <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            width='640'
            height='360'
            frameborder='0'
            allow='autoplay; fullsreeen;'
          ></Iframe> */}
      </BackBG>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const BackImg = styled.img`
  width: 100%;
  height: 100%;
`

const BackBG = styled.div`
  position: absolute; left: 0; top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
`

const Contents = styled.div`
  position: absolute; left: 50px; bottom: 400px;
  width: 700px;
`

const ReleaseDate = styled.span`
  color: #fff;

`

const Title = styled.h2`
  color: #fff;
  font-size: 50px;
  text-indent: -20px;
`
const VoteAvg = styled.p`
  color: #eee;
  margin-right: 30px;
`

const Overview = styled.p`
  color: #fff;
  font-size: 18px;
  margin-top: 30px;
`
const Iframe = styled.iframe`
  
`

export default DetailPage