import { signOut } from 'firebase/auth';
import { CollectionReference, doc, DocumentReference, DocumentSnapshot, getDoc, onSnapshot, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { auth, db } from '../firestore/firebase';
import { profileState } from '../state/profileState'
import { userAuthState } from '../state/userAuthState';
import { ProfileType } from '../types/ProfileType';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from '../styles/header.module.css'
import { styled } from '@mui/system';
import { headerModalShowState } from '../state/headerModalShowState';
import { logoutModalShowState } from '../state/logoutModalShowState';
import LogoutModal from './LogoutModal';


const MySettingsIcon = styled(SettingsIcon)({
  color: "rgb(80, 80, 80)",
  paddingRight: "5px",
})
const MyLogoutIcon = styled(LogoutIcon)({
  color: "rgb(80, 80, 80)",
  paddingRight: "5px",
})

const HeaderModal = () => {
  const router = useRouter();
  const setUserAuth = useSetRecoilState(userAuthState);

  // ヘッダーのモーダルの値をrecoilで管理
  const [headerModalShow, setHeaderModalShow] = useRecoilState(headerModalShowState);
  // ログアウトモーダルの値をrecoilで管理
  const [logoutModalShow, setLogoutModalShow] = useRecoilState(logoutModalShowState);
  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState(profileState);

  // 初回レンダリング時にprofile情報をfirebaseから取得してrecoilにセットする。
  // firebaseにprofile情報がない場合は、初期値を設定し、firebaseに送信してrecoilにもセットする。
  useEffect(()  => {
    const initialRendering = async() => {
      if(!auth.currentUser) return;
      // firebaseからユーザー情報を取得
      const initialProfile = doc(db, "users", auth.currentUser.uid) as DocumentReference<ProfileType>;
      const snapProfile =  await getDoc<ProfileType>(initialProfile);
      // 取得に成功した場合
      if (snapProfile.exists()){
        // firebaseのprofile情報をrecoilにセット
        setProfile(snapProfile.data())
      // 取得できなかった(データが入っていなかった)場合
      } else {
        // profileの初期値を設定
        const profileExapmle = {
          userName: "なまえ",
          userMemo: "よろしくお願いします。",
          userPickUpPhoto: "",
          userPickUpDescription: "",
          userIcon: "https://firebasestorage.googleapis.com/v0/b/v-photo.appspot.com/o/image%2Ficon3.png?alt=media&token=433d387c-2bcb-4f25-9593-a05b5d4dcb84",
        }
        // 初期値を設定する関数
        const initialProfileValue = async() => {
          if(auth.currentUser === null) return;
          // firebaseにprofile情報の初期値を送信
          const docRef = doc(db, "users", auth.currentUser.uid)
          await setDoc(docRef, profileExapmle);
          // recoilにも初期値をセット
          await setProfile(profileExapmle);
        }
        initialProfileValue()
      }
    }
    initialRendering()
  },[]);

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

  // ログアウトボタンを押した時に確認のモーダルウィンドウを表示する
  const handleLogoutModalShow = () => {
    setLogoutModalShow(true);
  };

  if(headerModalShow){
    return (
      <>
        <div id={styles.profile_modal}>
          <div id={styles.profile_modal_content}>
            <div className={styles.profile}>
              <div className={styles.profile_icon}>

                <PersonIcon 
                  style={{
                    backgroundColor: "black", 
                    color: "white", 
                    fontSize:"30px", 
                    borderRadius:"20px"
                  }}
                />
              </div>
              <div className={styles.profile_name}>
                {profile.userName}
              </div>
            </div>
            <Link href={"/mypage"} style={{"textDecoration":"none"}} >
              <div className={styles.mypage} >
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

export default HeaderModal