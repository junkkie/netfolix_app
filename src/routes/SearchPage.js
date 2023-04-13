import axios from 'API/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import 'styles/searchpage.css'
import MainPage from './MainPage';
import useDebounce from 'hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]); //검색결과에 맞는 영화들을 배열로 받아옴
  const navigate = useNavigate();

  const useQuery = () =>{
    return new URLSearchParams(useLocation().search);
  }
  console.log("useLocation >", useLocation())

  let query = useQuery(); //이 변수에 search : "?q=검색어" < 값이 저장됨

  const searchTerm = query.get("q"); //검색어
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  console.log("searchTerm >", debounceSearchTerm)

  useEffect(() =>{
    if(debounceSearchTerm) { //검색어가 입력되어 있으면 영화 정보 가져옴(공백문자, null값일 경우 영화 정보 가져오지 않도록)
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm]) // searchTerm값이 바뀔 떄마다 useEffect함수 실행(componentDidUpdate)

  const fetchSearchMovie = async (searchTerm) => {
    try {
      //https://api.themoviedb.org/3/search/movie?&query=검색어
      const request = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      console.log("request >", request)
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

  const renderSearchResults = () => {
    if(searchTerm === "")
    return <MainPage />

    return searchResults.length>0 ? ( //검색결과에 값이 있을 때
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){ //backdrop_path값이 존재하고, media_type이 person이 아닐 때
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                return (
                  <div className='movie'>
                    <div className='movie_column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                      <img className='movie_poster' src={movieImageUrl} alt={movie.title} />
                    </div>
                  </div>
                )
          }
        })};
      </section>
    ) : ( //값이 없을 때
      <section className='no-results'>
        <div className='no-results_text'>
          <p>
            찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }

  return renderSearchResults();
}

export default SearchPage