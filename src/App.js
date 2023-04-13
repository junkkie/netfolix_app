import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import DetailPage from 'routes/DetailPage';
import MainPage from 'routes/MainPage';
import SearchPage from 'routes/SearchPage';
import 'styles/app.css'

function App() {

  const Layout = () =>{ //함수형 컴포넌트 선언
    return (
      <>
        <Nav />
        <Outlet />
        <Footer />
      </>
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} /> {/* :param값 */}
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
      {/* <Nav />
      <Banner />
      <Row title='NETFLIX ORIGINALS' id='NO' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} />
      <Row title='Animation Movie' id='AM' fetchUrl={requests.fetchAnimationMovies} />
      <Row title='Family Movie' id='FM' fetchUrl={requests.fetchFamilyMovies} />
      <Row title='Adventure Movie' id='AM' fetchUrl={requests.fetchAdventureMovies} />
      <Row title='Science Fiction Movie' id='SM' fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title='Action Movie' id='AM' fetchUrl={requests.fetchAction} />
      <Footer /> */}
    </div>
  );
}

export default App;
