import { signOut } from 'firebase/auth';
import Link from 'next/link';
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { auth } from '../firestore/firebase';
import { MyButton } from '../pages/login';
import { logoutModalShowState } from '../state/logoutModalShowState';
import styles from '../styles/logoutModal.module.css'
import { MyCloseIcon } from './LoginModal';
import { useRouter } from 'next/router';
import { userAuthState } from '../state/userAuthState';
import { logoutCompleteModalShowState } from '../state/logoutCompleteModalShowState';
import { MyMuiRoundButton } from './atoms/buttons/MyMuiRoundButton';
import { MyMuiSquareButton } from './atoms/buttons/MyMuiSquareButton';
import { profileState } from '../state/profileState';

const LogoutModal = () => {
  const router = useRouter();
  const setUserAuth = useSetRecoilState(userAuthState);

  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState(profileState);

  // ログアウトモーダルの値をrecoilで管理
  const [logoutModalShow, setLogoutModalShow] = useRecoilState(logoutModalShowState);
  // ログアウト完了モーダルの値をrecoilで管理
  const [logouCompletetModalShow, setLogoutCompleteModalShow] = useRecoilState(logoutCompleteModalShowState);
  // モーダルウィンドウを閉じる関数
  const closeLogoutModal = () => {
    setLogoutModalShow(false);
  };

  // ログアウトする関数
  const handleLogout = async () => {
    await signOut(auth);
    await setUserAuth(false);
    await router.push("/");
    setProfile({
      userName: "No Name",
      userMemo: "よろしくお願いします。",
      userPickUpPhoto: "https://firebasestorage.googleapis.com/v0/b/v-photo.appspot.com/o/image%2Fno_image.png?alt=media&token=bf785fef-6b0a-4640-9a22-4be838549468",
      userPickUpDescription: "",
      userIcon: "https://firebasestorage.googleapis.com/v0/b/v-photo.appspot.com/o/image%2Ficon3.png?alt=media&token=433d387c-2bcb-4f25-9593-a05b5d4dcb84",
    })
    setLogoutCompleteModalShow(true);
  };



  if(logoutModalShow) {
    return (
      <>
        <div id={styles.logout_modal} onClick={closeLogoutModal}>
          <div id={styles.logout_modal_content}>
            <MyCloseIcon onClick={closeLogoutModal}/>
            <div>ログアウトしますか？</div>
            <Link href={"/"} style={{textDecoration: "none"}}>
              <MyMuiRoundButton
                onClick={handleLogout}
                sx={{width:"150px"}}
              >
                ログアウト
              </MyMuiRoundButton>
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return null
  }
}

export default LogoutModal