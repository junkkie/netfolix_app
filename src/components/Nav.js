import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'styles/nav.css'

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
      <img className='nav_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
        alt='' onClick={()=>{window.location.href = "/netfolix_app/"}} /> {/* 로고 클릭할 때마다 새로고침되도록 */}

      <input className='nav_input' type='search' placeholder='영화를 검색해 보세요'
        onChange={onChange} value={searchValue} />

      <img className='nav_avatar' src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
        alt='' />
    </nav>
  )
}

export default Nav