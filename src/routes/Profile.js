import { auth, db, storage } from 'fbase';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from 'firebase/auth';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';


const Profile = ({userObj}) => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState(userObj.displayName);
  const [newProfile, setNewProfile] = useState("");
  const [basicProfile, setBasicProfile] = useState("img/basic.png");

  //로그아웃
  const onLogOutClick = () =>{
    auth.signOut();
    navigate('/');
  }

    //프로필 이름 수정
    const onChangeName = (e) =>{
      const {target:{value}} = e;
      setNewName(value);
    }

    //submit
    const onProfileSubmit = async () => {
      try{
        if(userObj.displayName !== newName){
          await updateProfile(userObj, {displayName: newName});
        }
      } catch(error){
        console.log("error =>", error)
      }
    }

    const onFileChange = (e) => {
      const {target: {files}} =e;
      const theFile = files[0];

      const reader = new FileReader();
      reader.onloadend = (finishEvent) => {
        const {currentTarget: {result}} = finishEvent;
        setNewProfile(result);
      }
      reader.readAsDataURL(theFile);
    }

    const onImgSub = async (e) => {
      e.preventDefault();
      try {
        let profileUrl = "";
        if(newProfile !== ""){
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(storageRef, newProfile, 'data_url');
          profileUrl = await getDownloadURL(ref(storage, response.ref));
        }
        await updateProfile(userObj, {photoURL: profileUrl});
      } catch (error) {
        console.log("error: ", error);
      }
      console.log("photoURL =>", userObj)
    }
    
    const delImg = async () => {
      const alw = window.confirm("프로필 사진을 삭제하시겠어요?");
      if(alw){
        if(userObj.photoURL !== ""){
          const desertRef = ref(storage, userObj.photoURL);
          await deleteObject(desertRef);
        }
      }
    }

    useEffect(() => {

    },[])

    console.log("userObj =>", userObj)

  return (
    <BG>
      <H2>{newName ? newName : "USER"}의 프로필</H2>
      <Container>
        <BasicImg style={{backgroundImage: `url(${basicProfile})`}}></BasicImg>
        <ProfileImg style={{backgroundImage: `url(${userObj.photoURL})`}}></ProfileImg>
        <ProfileImgSelected style={{backgroundImage: `url(${newProfile})`}}></ProfileImgSelected>        <DelImg onClick={delImg}>이미지 삭제</DelImg>
        <ImgForm onSubmit={onImgSub}>
        <InputFile type='file' onChange={onFileChange} />
        <ImgSub type='submit' value="이미지 업데이트" />
        </ImgForm>
        <ProfileForm onSubmit={onProfileSubmit}>
          <InputName type='text' value={newName} placeholder='이름' onChange={onChangeName} />
          <InputSub type='submit' value="업데이트" />
        </ProfileForm>
        <LogoutBtn onClick={onLogOutClick}>로그아웃</LogoutBtn>
      </Container>
    </BG>

  )
}

export default Profile

const BG = styled.div`
width: 100vw; height: 65vh;
padding-top: 100px;
background: transparent;
`
const H2 = styled.h2`
color: #fff;
margin-top: 50px;
margin-left: 70px;
margin-bottom: 150px;
`
const Container = styled.div`
margin-top: 100px;
margin-left: 60px;
position: relative;
`
const BasicImg = styled.div`
width: 100px; height: 100px;
position: absolute; left: 50px; top: -120px;
background-size: contain;
`
const ProfileImg = styled.div`
width: 100px; height: 100px;
position: absolute; left: 50px; top: -120px;
background-size: contain;
`
const ProfileImgSelected = styled.div`
width: 50px; height: 50px;
position: absolute; left: 150px; top: -70px;
background-size: contain;
`
const DelImg = styled.button`
position: absolute; top: 50px; left: 60px;
background-color: #361a92;
border: none;
border-radius: 5px;
padding: 5px 10px;
font-size: 0.7rem;
color: #fff;
`
const ImgForm = styled.form`

`
const InputFile = styled.input`
position: absolute; top: -10px; left: 10px;
background-color: transparent;
border: none;
border-radius: 5px;
padding: 5px 10px;
font-size: 0.7rem;
color: #fff;
&::-webkit-file-upload-button{background:#361a92; color: #fff; border: none; font-size: 0.8rem; border-radius: 5px;}
`
const ImgSub = styled.input`
position: absolute; top: 20px; left: 48px;
background-color: #361a92;
border: none;
border-radius: 5px;
padding: 5px 10px;
font-size: 0.7rem;
color: #fff;
`
const ProfileForm = styled.form`
margin-left: 300px;
`
const InputName = styled.input`
position: absolute; top: -40px; left: 250px;
width: 150px;
padding-bottom: 5px;
border-radius: 2px;
border: none;
border-bottom: 1px solid #eee;
background: transparent;
font-size: 1rem;
color: #fff;
font-weight: 600;
`
const InputSub = styled.input`
position: absolute; top: -40px; left: 410px;
background-color: #361a92;
border: none;
border-radius: 5px;
padding: 5px 10px;
font-size: 0.7rem;
color: #fff;
`
const LogoutBtn = styled.button`
position: absolute; top: -40px; left: 480px;
background-color: #1d0f4b;
border: none;
border-radius: 5px;
padding: 5px 10px;
font-size: 0.7rem;
color: #fff;
`
