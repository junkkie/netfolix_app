import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'styles/nav.css'
import logo from 'img/logo.png'

function Nav({userObj}) {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newProfile, setNewProfile] = useState("")
  const navigate = useNavigate();

  useEffect (() =>{
    window.addEventListener("scroll", () =>{
      if(window.scrollY>50){
        setShow(true);
      }else{
        setShow(false);
      }
    })
    return () =>{ // 컴포넌트를 사용하지 않을 때
      window.removeEventListener("scroll", () =>{});
    }
  },[])

  const onChange = (e) =>{
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`); // 검색창에 검색어 입력(e.target.value) 시 입력한 값이 붙은 주소로 강제 이동
  }

  return (
    <nav className={`nav ${show && 'nav_black'}`}> {/* show가 true이면 className을 추가한다 */}
      <img className='nav_logo' src={logo}
        alt='NETFOLIX_logo' onClick={()=>{window.location.href = "/netfolix_app/"}} /> {/* 로고 클릭할 때마다 새로고침되도록 */}

      <input className='nav_input' type='search' placeholder='영화를 검색해 보세요'
        onChange={onChange} value={searchValue} />

      <Link to='/profile'>
        <img className='basic_avatar' src='img/basic.png' alt='기본 이미지' />
      <img className='nav_avatar' src={userObj.photoURL ? userObj.photoURL : newProfile} alt='' />
      </Link> 
    </nav>
  )
}

export default Nav