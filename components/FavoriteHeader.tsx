import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';
import styles from '../styles/header.module.css'

import Vphotologo from '../public/Vphotologo.svg'
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileState } from '../state/profileState';
import { auth } from '../firestore/firebase';
import { headerModalShowState } from '../state/headerModalShowState';
import { loginModalShowState } from '../state/loginModalShowState';
import { logoutModalShowState } from '../state/logoutModalShowState';
import HeaderModal from './HeaderModal';
import LoginModal from './LoginModal';
import LogoutModal from './LogoutModal';
import LogoutCompleteModal from './LogoutCompleteModal';

// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  fontSize:"35px",
  marginRight:"8px",
  marginTop:"10px",
  borderRadius:"16px",
  padding:"4px",
  backgroundColor: "rgba(195,0,0,0.6)",
  color:"white",

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

const FavoriteHeader = () => {
  // プロフィールの情報をuseRecoilから取得
  const profile = useRecoilValue(profileState);
    // ヘッダーのモーダルの値をrecoilで管理
    const [headerModalShow, setHeaderModalShow] = useRecoilState(headerModalShowState);

    // ログインモーダルの値をrecoilで管理
    const [loginModalShow, setLoginModalShow] = useRecoilState(loginModalShowState);
    // ログアウトモーダルの値をrecoilで管理
    const [logoutModalShow, setLogoutModalShow] = useRecoilState(logoutModalShowState);

  // ユーザーアイコンをクリックした時に走る関数
  const handleClickUserIcon = () => {
    if(auth.currentUser){
      setLogoutModalShow(false);
      setHeaderModalShow(!headerModalShow);
    } else {
      return setLoginModalShow(true);
    }
  }
  return (
    <>
      <header>
        <div  className={styles.header}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <Vphotologo width="65px" height="auto" cursor="pointer"/>
            </Link>
          </div>
          <Link href={"/"}>
            <MyFavoriteBorderIcon />
          </Link>
        <img className={styles.user_icon} src={profile.userIcon} alt="user icon" onClick={handleClickUserIcon} style={{width:"35px", height:"35px", borderRadius:"20px", cursor:"pointer"}}/>
        <HeaderModal />
        <LoginModal />
        <LogoutModal />
        <LogoutCompleteModal />
        </div>
      </header>
    </>
  )
}

export default FavoriteHeader