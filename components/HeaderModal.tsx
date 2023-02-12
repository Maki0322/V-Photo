import { signOut } from 'firebase/auth';
import { CollectionReference, doc, DocumentSnapshot, getDoc, onSnapshot, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';
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
  
  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState(profileState);

  // 初回レンダリング時にprofile情報をfirebaseから取得してrecoilにセットする。
  // firebaseにprofile情報がない場合は、初期値を設定し、firebaseに送信してrecoilにもセットする。
  useEffect(()  => {
    const initialRendering = async() => {
      if(auth.currentUser === null){
        return
      } 
      // firebaseからユーザー情報を取得
      const initialProfile = doc(db, "users", auth.currentUser.uid);
      const snapProfile =  await getDoc<any>(initialProfile);
      // 取得に成功した場合
      if (snapProfile.exists()){
        // firebaseのprofile情報をrecoilにセット
        setProfile(snapProfile.data())
      // 取得できなかった(データが入っていなかった)場合
      } else {
        // profileの初期値を設定
        const profileExapmle = {
          userName: "No Name",
          userMemo: "",
          userPickUpPhoto: "",
          userPickUpDescription: "",
        }
        // 初期値を設定する関数
        const initialProfileValue = async() => {
          if(auth.currentUser === null){
            return
          } 
          // firebaseにprofile情報の初期値を送信
          const docRef = doc(db, "users", auth.currentUser.uid)
          await setDoc(docRef, profileExapmle);
          // recoilにも初期値をセット
          await setProfile(profileExapmle)
        }
        initialProfileValue()
      }
    }
    initialRendering()

    console.log(profile.userName)
  },[]);

  // レンダリング時に走る関数
  useEffect(() => {
    if(auth.currentUser === null){
      return;
    };
    // firebaseからデータを取得
    const postProfile = doc<ProfileType>(db, "users", auth.currentUser.uid);
    // リアルタイムでデータを取得
    onSnapshot(postProfile, (querySnapshot:DocumentSnapshot<ProfileType>) => {
      setProfile(querySnapshot.data());
    });
  },[]);

  // ログアウトする関数
  const handleLogout = async () => {
    await signOut(auth)
    setUserAuth(false)
    router.push("/")
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
            <Link href={"/login"} style={{"textDecoration":"none"}}>
              <div className={styles.logout}  onClick={handleLogout}>
                <MyLogoutIcon />
                <p className={styles.logout_p}>ログアウト</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default HeaderModal