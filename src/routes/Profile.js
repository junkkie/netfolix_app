import { auth, db, storage } from 'fbase';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { updateProfile } from 'firebase/auth';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Profile = ({userObj, isLoggedIn}) => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState(userObj.displayName);
  const [newProfile, setNewProfile] = useState("");
  const [editing, setEditing] = useState(false);

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
      const q = query(collection(db, `${userObj.uid}`));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id})
      });
      console.log(newArray)
      })
    },[])

    console.log("userObj =>", userObj)

  return (
    <BG>
      <H2>{newName}의 프로필</H2>
      <Container>
        <ProfileImg style={newProfile ? {backgroundImage: `url(${newProfile})`} : {backgroundImage: `url(${userObj.photoURL})`}}></ProfileImg>
        <DelImg onClick={delImg}>이미지 삭제</DelImg>
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
width: 100vw; height: 100vh;
padding-top: 100px;
background: #121212;
`
const H2 = styled.h2`
color: #fff;
`
const Container = styled.div`
margin-top: 100px;

`
const ProfileImg = styled.div`
width: 100px; height: 100px;
background-size: contain;
`
const DelImg = styled.button`

`
const ImgForm = styled.form`

`
const InputFile = styled.input`

`
const ImgSub = styled.input`

`
const ProfileForm = styled.form`
margin-left: 300px;
`
const InputName = styled.input`

`
const InputSub = styled.input`

`
const LogoutBtn = styled.button`

`
