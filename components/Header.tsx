import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';

import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState} from 'recoil';
import { Button,TextField, FormLabel, Divider } from '@mui/material';


import styles from '../styles/header.module.css'

import Vphotologo from '../public/Vphotologo.svg'
import { signOut } from 'firebase/auth';
import { auth } from '../firestore/firebase';
import { userAuthState } from '../state/userAuthState';

// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  fontSize:"35px",
  marginRight:"8px",
  marginTop:"10px",
  borderRadius:"16px",
  padding:"4px",
  "&:hover": {
    backgroundColor: "rgba(195,0,0,0.3)",
    color:"white",
    cursor: "pointer",
  }
})

// PersonIconのcss
const MyPersonIcon = styled(PersonIcon)({
  cursor: "pointer",
  color:"white",
  fontSize:"30px",
  border:"solid 1px black",
  backgroundColor:"black",
  borderRadius: "30px",
  margin:"14px 5px 5px 5px",
})



const Header = () => {
  const router = useRouter();
  const setUserAuth = useSetRecoilState(userAuthState);

  // ログアウトする関数
  const handleLogout = async () => {
    await signOut(auth)
    setUserAuth(false)
    router.push("/login")
  };

  console.log(auth.currentUser);

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Vphotologo width="65px" height="auto" cursor="pointer"/>
        </div>

        {/* 仮で作成 */}
        <Button onClick={handleLogout}>ログアウト</Button>

        <MyFavoriteBorderIcon />
        <MyPersonIcon />
      </div>
    </header>
  )
}

export default Header