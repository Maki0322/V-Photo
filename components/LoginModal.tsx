import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { loginModalShowState } from '../state/loginModalShowState'

const LoginModal = () => {
  // ログインモーダルの値をrecoilで管理
  const [loginModalShow, setLoginModalShow] = useRecoilState(loginModalShowState);

  if(loginModalShow) {
    return (
      <>
        <div id={styles.profile_modal}>
          <div id={styles.profile_modal_content}>
            <div>こんにちは</div>
            {/* <div className={styles.profile}>
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
            </Link> */}
          </div>
        </div>
      </>
    )
  }
}

export default LoginModal