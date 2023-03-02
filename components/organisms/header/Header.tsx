import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState} from 'recoil';
import { doc, DocumentReference, getDoc, setDoc } from 'firebase/firestore';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/system';

import styles from '../../../styles/header.module.css'
import Vphotologo from '../../../public/vphotologo.svg'
import { auth, db } from '../../../firestore/firebase';
import { headerModalShowState } from '../../../state/headerModalShowState';
import { loginModalShowState } from '../../../state/loginModalShowState';
import { logoutModalShowState } from '../../../state/logoutModalShowState';
import { profileState } from '../../../state/profileState';
import { selectPickUpPhotoState } from '../../../state/selectPickUpPhotoState';
import HeaderModal from '../modal/HeaderModal';
import LoginModal from '../modal/LoginModal';
import LogoutModal from '../modal/LogoutModal';
import LogoutCompleteModal from '../modal/LogoutCompleteModal';
import { ProfileType } from '../../../types/ProfileType';


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
  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState(profileState);
  // mypageの仮選択のピックアップフォトの値をuseRecoilで管理
  const setSelectPickUpPhoto = useSetRecoilState(selectPickUpPhotoState);

   // profileの初期値を設定
   const profileExapmle = {
    userName: "No Name",
    userMemo: "よろしくお願いします。",
    userPickUpPhoto: "https://firebasestorage.googleapis.com/v0/b/v-photo.appspot.com/o/image%2Fno_image.png?alt=media&token=bf785fef-6b0a-4640-9a22-4be838549468",
    userPickUpDescription: "",
    userIcon: "https://firebasestorage.googleapis.com/v0/b/v-photo.appspot.com/o/image%2Ficon3.png?alt=media&token=433d387c-2bcb-4f25-9593-a05b5d4dcb84",
  }

  // 初回レンダリング時にprofile情報をfirebaseから取得してrecoilにセットする。
  // firebaseにprofile情報がない場合は、初期値を設定し、firebaseに送信してrecoilにもセットする。
  useEffect(()  => {
    const initialRendering = async() => {
      // ログインしていない場合はプロフィールにprofileExapmleを設定
      if(!auth.currentUser) return setProfile(profileExapmle);
      // firebaseからユーザー情報を取得
      const initialProfile = await doc(db, "users", auth.currentUser.uid) as DocumentReference<ProfileType>;
      const snapProfile =  await getDoc<ProfileType>(initialProfile);
      // 取得に成功した場合
      if (snapProfile.exists()){
        // firebaseのprofile情報をrecoilにセット
        await setProfile(snapProfile.data());
        await setSelectPickUpPhoto(snapProfile.data().userPickUpPhoto);
      // 取得できなかった(データが入っていなかった)場合
      } else {
      
        // 初期値を設定する関数
        const initialProfileValue = async() => {
          if(auth.currentUser === null) return;
          // firebaseにprofile情報の初期値を送信
          const docRef = doc(db, "users", auth.currentUser.uid)
          await setDoc(docRef, profileExapmle);
          // recoilにも初期値をセット
          await setProfile(profileExapmle);
          await setSelectPickUpPhoto(profileExapmle.userPickUpPhoto)
        }
        initialProfileValue()
      }
    }
    initialRendering()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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