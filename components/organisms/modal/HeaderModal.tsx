import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { doc, DocumentReference, DocumentSnapshot, getDoc, onSnapshot, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';

import { styled } from '@mui/system';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { auth, db } from '../../../firestore/firebase';
import { profileState } from '../../../state/profileState'
import { headerModalShowState } from '../../../state/headerModalShowState';
import { logoutModalShowState } from '../../../state/logoutModalShowState';
import { ProfileType } from '../../../types/ProfileType';
import styles from '../../../styles/header.module.css'


const MySettingsIcon = styled(SettingsIcon)({
  color: "rgb(80, 80, 80)",
  paddingRight: "5px",
})
const MyLogoutIcon = styled(LogoutIcon)({
  color: "rgb(80, 80, 80)",
  paddingRight: "5px",
})

const HeaderModal = () => {



  // ヘッダーのモーダルの値をrecoilで管理
  const [headerModalShow, setHeaderModalShow] = useRecoilState(headerModalShowState);
  // ログアウトモーダルの値をrecoilで管理
  const setLogoutModalShow = useSetRecoilState(logoutModalShowState);
  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState(profileState);

  // レンダリング時に走る関数
  useEffect(() => {
    if(auth.currentUser === null){
      return;
    };
    // firebaseからデータを取得
    const postProfile = doc(db, "users", auth.currentUser.uid) as DocumentReference<ProfileType>;
    // リアルタイムでデータを取得
    onSnapshot<ProfileType>(postProfile, (querySnapshot:DocumentSnapshot<ProfileType>) => {
      if (!querySnapshot.exists()) return
      setProfile(querySnapshot.data());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // ログアウトボタンを押した時にヘッダーモーダルを閉じて、確認のモーダルウィンドウを表示する
  const handleLogoutModalShow = () => {
    setHeaderModalShow(false);
    setLogoutModalShow(true);
  };
  // クリックしたときにモーダルを閉じる
  const closeHeaderModal = () => {
    setHeaderModalShow(false);
  };

  if(headerModalShow){
    return (
      <>
        <div id={styles.profile_modal}>
          <div id={styles.profile_modal_content}>
            <div className={styles.profile}>
              <div className={styles.profile_icon}>
                <img 
                  src={profile.userIcon} 
                  alt="user icon" 
                  style={{
                    width:"30px",
                    height:"30px",
                    borderRadius:"15px",
                    marginLeft:"2px"
                  }}
                />
              </div>
              <div className={styles.profile_name}>
                {profile.userName}
              </div>
            </div>
            <Link href={"/mypage"} style={{"textDecoration":"none"}} >
              <div className={styles.mypage} onClick={closeHeaderModal}>
                <MySettingsIcon />
                <p className={styles.mypage_p}>マイページ</p>
              </div>
            </Link>
            <div className={styles.logout_modal_show}  onClick={handleLogoutModalShow}>
              <MyLogoutIcon />
              <p className={styles.logout_modal_show_p}>ログアウト</p>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default HeaderModal;