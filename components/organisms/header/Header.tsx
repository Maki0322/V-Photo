import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/system';

import styles from '../../../styles/header.module.css'
import Vphotologo from '../../../public/vphotologo.svg'
import { headerModalShowState } from '../../../state/headerModalShowState';
import { loginModalShowState } from '../../../state/loginModalShowState';
import { logoutModalShowState } from '../../../state/logoutModalShowState';
import { profileState } from '../../../state/profileState';
import { auth } from '../../../firestore/firebase';
import HeaderModal from '../modal/HeaderModal';
import LoginModal from '../modal/LoginModal';
import LogoutModal from '../modal/LogoutModal';
import LogoutCompleteModal from '../modal/LogoutCompleteModal';


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

const Header = () => {
  const router = useRouter();

  // ヘッダーのモーダルの値をrecoilで管理
  const [headerModalShow, setHeaderModalShow] = useRecoilState(headerModalShowState);
  // ログインモーダルの値をrecoilで管理
  const setLoginModalShow = useSetRecoilState(loginModalShowState);
  // ログアウトモーダルの値をrecoilで管理
  const setLogoutModalShow = useSetRecoilState(logoutModalShowState);
  // プロフィールの情報をuseRecoilから取得
  const profile = useRecoilValue(profileState);

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
      setHeaderModalShow(!headerModalShow);
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
        <div>
          <MyFavoriteBorderIcon onClick={handleClickFavoritePageIcon}/>
        </div>
        <img 
          className={styles.user_icon} 
          src={profile.userIcon} 
          alt="user icon" 
          onClick={handleClickUserIcon} 
          style={{
            width:"35px", 
            height:"35px", 
            borderRadius:"20px", 
            cursor:"pointer"
          }}
        />
        <HeaderModal />
        <LoginModal />
        <LogoutModal />
        <LogoutCompleteModal />
      </div>
    </header>
  )
}

export default Header