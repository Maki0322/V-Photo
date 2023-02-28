import Link from 'next/link';
import React from 'react'
import { useRecoilState } from 'recoil';
import { MyButton } from '../pages/login';
import { logoutCompleteModalShowState } from '../state/logoutCompleteModalShowState';
import { MyCloseIcon } from './LoginModal';
import styles from '../styles/LogoutCompleteModal.module.css';
import { MyMuiSquareButton } from './atoms/buttons/MyMuiSquareButton';

const LogoutCompleteModal = () => {
  // ログアウト完了モーダルの値をrecoilで管理
  const [logouCompleteModalShow, setLogoutCompleteModalShow] = useRecoilState(logoutCompleteModalShowState);
  // モーダルウィンドウを閉じる関数
  const closeLogoutCompleteModal = () => {
    setLogoutCompleteModalShow(false);
  };
  if(logouCompleteModalShow) {
    return (
      <>
        <div id={styles.logout_complete_modal} onClick={closeLogoutCompleteModal}>
          <div id={styles.logout_complete_modal_content}>
            <MyCloseIcon onClick={closeLogoutCompleteModal}/>
            <div>ログアウトしました。</div>
            <MyMuiSquareButton 
              onClick={closeLogoutCompleteModal}
            >
              OK
            </MyMuiSquareButton>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  };
};

export default LogoutCompleteModal;