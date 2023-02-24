import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';

import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState} from 'recoil';
import { Button } from '@mui/material';


import styles from '../styles/header.module.css'

import Vphotologo from '../public/Vphotologo.svg'
import { signOut } from 'firebase/auth';
import { auth } from '../firestore/firebase';
import { userAuthState } from '../state/userAuthState';
import Link from 'next/link';

import HeaderModal from './HeaderModal';
import { headerModalShowState } from '../state/headerModalShowState';
import LoginModal from './LoginModal';
import { loginModalShowState } from '../state/loginModalShowState';
import { logoutModalShowState } from '../state/logoutModalShowState';
import { MyButton } from '../pages/login';
import LogoutModal from './LogoutModal';
import LogoutCompleteModal from './LogoutCompleteModal';

// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  fontSize:"35px",
  marginRight:"8px",
  marginTop:"10px",
  borderRadius:"16px",
  padding:"4px",
  color:"black",
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

  // ヘッダーのモーダルの値をrecoilで管理
  const [headerModalShow, setHeaderModalShow] = useRecoilState(headerModalShowState);

  // ログインモーダルの値をrecoilで管理
  const [loginModalShow, setLoginModalShow] = useRecoilState(loginModalShowState);
  // ログアウトモーダルの値をrecoilで管理
  const [logoutModalShow, setLogoutModalShow] = useRecoilState(logoutModalShowState);

  // ログイン済みの場合はfavoriteページを表示し、ログインしていない場合はloginModalを表示する関数
  const handleClickFavoritePageIcon = async () => {
    if(!auth.currentUser) {
      setLoginModalShow(true);
    } else {
      router.push("/favorite");
    }
  };

  // ユーザーアイコンをクリックした時に走る関数
  const handleClickUserIcon = () => {
    if(auth.currentUser){
      setLogoutModalShow(false);
      setHeaderModalShow(true);
    } else {
      return setLoginModalShow(true);
    }
  }

  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Vphotologo width="65px" height="auto" cursor="pointer"/>
          </Link>
        </div>


        <MyFavoriteBorderIcon onClick={handleClickFavoritePageIcon}/>

        <MyPersonIcon  onClick={handleClickUserIcon}/>
        <HeaderModal />
        <LoginModal />
        <LogoutModal />
        <LogoutCompleteModal />
      </div>
    </header>
  )
}

export default Header