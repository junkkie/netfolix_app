import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from 'fbase';
import '../styles/auth.css'
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const onChange = (e) =>{ // input
    console.log(e.target.name);
    console.log(e);
    const {target:{name, value}} = e;

    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }

  const onSubmit = async(e) =>{ // submit
    e.preventDefault();
    try{
      let data;
      if(newAccount){
        data = await createUserWithEmailAndPassword(auth, email, password)
      }else{
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log('data->',data)
    } catch(error) {
      console.log('error ->',error)
      setError(error.message)
    }
  }

  const onSocialClick = async(e) =>{ // google/github 로그인
    console.log(e.target.name);
    const {target:{name}} = e;
    let provider;

    if(name === 'google'){
      provider = new GoogleAuthProvider();
    } else if(name === 'github'){
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(auth, provider)
    console.log('data->',data)
  }

  const toggleAccount = () => setNewAccount(prev => !prev)

  useEffect(() => {
    const authForm = document.querySelector(".authForm")
    if (authForm) {
      authForm.classList.add("on");
    }
  },[])

  return (
    <div className='bg'>
    <div id='fly-in'>
      <div><span>OTT 서비스 앱</span>NETFOLIX</div>
    </div>
      <div className='authForm' >
        <div className='logo'></div>
        <form onSubmit={onSubmit}>
          <input type='email' name='email' placeholder='이메일' value={email} required onChange={onChange} />
          <input type='password' name='password' placeholder='비밀번호' value={password} onChange={onChange} />
          <input type='submit' value={newAccount ? "새로운 계정 만들기" : "로그인"} />
        </form>
        <span className='toggleAccount' onClick={toggleAccount}>
          {newAccount ? "로그인" : "회원가입"}
        </span>
        <div className='social'>
          <button name='google' onClick={onSocialClick}><FontAwesomeIcon icon="fa-brands fa-google" /><FaGoogle /></button>
          <button name='github' onClick={onSocialClick}><FontAwesomeIcon icon="fa-brands fa-github" /><FaGithub /></button>
        </div>
      </div>
    </div>
  )
}

export default Auth
