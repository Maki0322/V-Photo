import Link from 'next/link'
import React from 'react'
import { useRecoilState } from 'recoil'

import { loginModalShowState } from '../../../state/loginModalShowState'
import { MyMuiRoundButton } from '../../atoms/buttons/MyMuiRoundButton'
import { MyMuiCloseIcon } from '../../atoms/icons/MyMuiCloseIcon';
import styles from '../../../styles/loginModal.module.css'
import RightAligned from '../../molecules/RightAligned'

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
            <RightAligned>
              <MyMuiCloseIcon onClick={closeLoginModal}/>
            </RightAligned>
            <div className={styles.modal_content}>
              <div className={styles.modal_content_sentence}>この機能を使用するにはログインが必要です。</div>
              <div>ログインしますか？</div>
            </div>
            <Link href={"/login"} style={{textDecoration: "none"}}>
              <RightAligned>
                <MyMuiRoundButton>ログインページへ</MyMuiRoundButton>
              </RightAligned>
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