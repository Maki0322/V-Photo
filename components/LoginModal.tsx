import Link from 'next/link'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { MyButton } from '../pages/login'
import { loginModalShowState } from '../state/loginModalShowState'
import styles from '../styles/loginModal.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

export const MyCloseIcon = styled(CloseIcon)({
  cursor: "pointer",
})


const LoginModal = () => {
  // ログインモーダルの値をrecoilで管理
  const [loginModalShow, setLoginModalShow] = useRecoilState(loginModalShowState);

  // モーダルウィンドウを閉じる関数
  const closeLoginModal = () => {
    setLoginModalShow(false);
  };

  if(loginModalShow) {
    return (
      <>
        <div id={styles.login_modal} onClick={closeLoginModal}>
          <div id={styles.login_modal_content}>
            <MyCloseIcon onClick={closeLoginModal}/>
            <div>この機能を使用するにはログインが必要です。</div>
            <div>ログインしますか？</div>
            <Link href={"/login"} style={{textDecoration: "none"}}>
              <MyButton>ログインページへ</MyButton>
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default LoginModal