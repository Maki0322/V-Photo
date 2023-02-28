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

const LogoutModal = () => {
  const router = useRouter();
  const setUserAuth = useSetRecoilState(userAuthState);

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
              <MyMuiSquareButton
                onClick={handleLogout}
                sx={{width:"150px"}}
              >
                ログアウト
              </MyMuiSquareButton>
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