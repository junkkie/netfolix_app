import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import DetailPage from 'routes/DetailPage';
import MainPage from 'routes/MainPage';
import SearchPage from 'routes/SearchPage';
import Profile from 'routes/Profile';
import 'styles/app.css'
import Auth from 'routes/Auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj,setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);


  const Layout = () =>{ //함수형 컴포넌트 선언
    return (
      <>
        <Nav userObj={userObj} />
        <Outlet />
        <Footer />
      </>
    )
  }

  return (
    <>
      {init ? (
        <div className="app">
          <Routes>
            {isLoggedIn ? 
            <>
              <Route path='/' element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path=':movieId' element={<DetailPage />} /> {/* :param값 */}
                <Route path='search' element={<SearchPage />} />
                <Route path='profile' element={<Profile isLoggedIn={isLoggedIn} userObj={userObj} />} />
              </Route>
            </>
              :
              <Route path='/' element={<Auth />} />
            }
          </Routes>
        </div>
      ):(
        <div className='loading'>
          <span>loading...</span>
        </div>
      )}
    </>

  );
}

export default App;
