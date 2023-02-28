import Link from 'next/link'
import React from 'react'
import { useRecoilState } from 'recoil'

import { loginModalShowState } from '../../../state/loginModalShowState'
import { MyMuiRoundButton } from '../../atoms/buttons/MyMuiRoundButton'
import { MyMuiCloseIcon } from '../../atoms/icons/MyMuiCloseIcon';
import styles from '../../../styles/loginModal.module.css'

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
            <MyMuiCloseIcon onClick={closeLoginModal}/>
            <div>この機能を使用するにはログインが必要です。</div>
            <div>ログインしますか？</div>
            <Link href={"/login"} style={{textDecoration: "none"}}>
              <MyMuiRoundButton>ログインページへ</MyMuiRoundButton>
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