import axios from "axios";

const instance = axios.create({
  baseURL : "https://api.themoviedb.org/3", // 이 내용 뒤로는 카테고리 이름(path) 따라 온다
  params : {
    api_key : process.env.REACT_APP_MOVIE_DB_API_KEY,
    language : "ko-KR",
  }
})

export default instance