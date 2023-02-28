import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';
// import { Button, Slider } from '@mui/material';

import { Area, MediaSize } from 'react-easy-crop';

import Header from '../components/Header'
import CropModal from '../components/CropModal';

import getCroppedImg from '../const/getCroppedImg';

import { cropModalShowState } from '../state/cropModalShowState';
import { imgSrcState } from '../state/reactEasyCropState';

import styles from '../styles/mypage.module.css'

import { collection, doc, DocumentData, DocumentSnapshot, getDoc, onSnapshot, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firestore/firebase';
import { profileState } from '../state/profileState';
import { ProfileType } from '../types/ProfileType';
import { ref, uploadBytes } from 'firebase/storage';

import EditProfileModal from '../components/EditProfileModal';

import { MyMuiRoundButton } from '../components/atoms/buttons/MyMuiRoundButton';
import EditPickUpPhotoModal from '../components/EditPickUpPhotoModal';
import EditUserPickUpPhotoModal from '../components/EditUserPickUpPhotoModal';

// PersonIconのcss
export const MyPersonIcon = styled(PersonIcon)({
  cursor: "pointer",
  color:"white",
  fontSize:"120px",
  border:"solid 1px black",
  backgroundColor:"black",
  borderRadius: "120px",
  margin:"15px 5px 5px 5px",
})

export const CROP_WIDTH = 400;
export const ASPECT_RATIO = 1;

const mypage = () => {
  // クロップモーダルの値をrecoilで管理
  const setCropModalShow = useSetRecoilState(cropModalShowState);


  const profile = useRecoilValue(profileState);


  // EditProfileモーダルの値をstateで管理
  const [editProfileModal, setEditProfileModal] = useState(false);
  // モーダルウィンドウを開閉する関数
  const toggleEditProfileModal = ():void => setEditProfileModal(!editProfileModal);
  // モーダルウィンドウを開く関数
  const openEditProfileModal = () => {
    setEditProfileModal(true);
  };
  // モーダルウィンドウを閉じる関数
  const closeEditProfileModal = () => {
    setEditProfileModal(false);
  };

  // EditPickUpPhotoModalのモーダルの値をstateで管理
  const [editPickUpPhotoModal, setEditPickUpPhotoModal] = useState(false);
   // EditPickUpPhotoModalを開く関数
   const openEditPickUpPhotoModal = () => {
    setEditPickUpPhotoModal(true);
  };
  // EditPickUpPhotoModalを閉じる関数
  const closeEditPickUpPhotoModal = () => {
    setEditPickUpPhotoModal(false);
  };

  // EditUserPickUpPhotoModalのモーダルの値をstateで管理
  const [editUserPickUpPhotoModal, setEditUserPickUpPhotoModal] = useState(false);
   // EditUserPickUpPhotoModalを開く関数
   const openEditUserPickUpPhotoModal = () => {
    setEditUserPickUpPhotoModal(true);
  };
  // EditUserPickUpPhotoModalを閉じる関数
  const closeEditUserPickUpPhotoModal = () => {
    setEditUserPickUpPhotoModal(false);
  };

  /**
   * ファイルアップロード後
   * 画像ファイルのURLをセットしモーダルを表示する
   */
  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (reader.result) {
            setImgSrc(reader.result.toString() || "");
            setCropModalShow(true);
          }
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    []
  );
  const [imgSrc, setImgSrc] = useRecoilState(imgSrcState);

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  /** 画像拡大縮小の最小値 */
  const [minZoom, setMinZoom] = useState(1);
  /** 切り取る領域の情報 */
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImgSrc, setCroppedImgSrc] = useState<any>();

  
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    if (mediaAspectRadio > ASPECT_RATIO) {
      // 縦幅に合わせてZoomを指定
      const result = CROP_WIDTH / ASPECT_RATIO / height;
      setZoom(result);
      setMinZoom(result);
      return;
    }
    // 横幅に合わせてZoomを指定
    const result = CROP_WIDTH / width;
    setZoom(result);
    setMinZoom(result);
  }, []);
  
  /**
   * 切り取り後の画像を生成し画面に表示
  */
 const showCroppedImage = useCallback(async () => {
   if (!croppedAreaPixels) return;
   try {
     const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
     await setCroppedImgSrc(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);




   
  return (
    <>
      <Head>
        <title>Myページ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/VPhotoIcon2.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section>
          <div className={styles.user_profile}>
            <div className={styles.user_icon}>
              <img src={profile.userIcon} alt="user icon" className={styles.icon}/>
            </div>
            <div className={styles.user_info}>
              <div className={styles.user_name}>{profile.userName}</div>
              <div className={styles.user_memo}>{profile.userMemo}</div>
            </div>
          </div>
          <div className={styles.edit_area}>
            <div className={styles.edit_profile_button}>
              <MyMuiRoundButton 
                onClick={openEditProfileModal}
                sx={{width:"170px"}}
              >
                プロフィールを編集
              </MyMuiRoundButton>
            </div>
            <EditProfileModal 
              editProfileModal={editProfileModal}
              toggleEditProfileModal={toggleEditProfileModal}
              openEditProfileModal={openEditProfileModal}
              closeEditProfileModal={closeEditProfileModal}
            />
            <CropModal 
              crop={crop}
              setCrop={setCrop}
              zoom={zoom}
              setZoom={setZoom}
              onCropComplete={onCropComplete}
              imgSrc={imgSrc}
              showCroppedImage={showCroppedImage}
              onMediaLoaded={onMediaLoaded}
              minZoom={minZoom}
            />


            <div className={styles.edit_pickup_button}>
              <MyMuiRoundButton
                sx={{width:"170px"}}
                onClick={openEditPickUpPhotoModal}
              >
                ピックアップを編集
              </MyMuiRoundButton>
            </div>
            <EditPickUpPhotoModal 
              editPickUpPhotoModal={editPickUpPhotoModal}
              openEditPickUpPhotoModal={openEditPickUpPhotoModal}
              closeEditPickUpPhotoModal={closeEditPickUpPhotoModal}
              openEditUserPickUpPhotoModal={openEditUserPickUpPhotoModal}
            />
            <EditUserPickUpPhotoModal 
              editUserPickUpPhotoModal={editUserPickUpPhotoModal}
              openEditUserPickUpPhotoModal={openEditUserPickUpPhotoModal}
              closeEditUserPickUpPhotoModal={closeEditUserPickUpPhotoModal}
              openEditPickUpPhotoModal={openEditPickUpPhotoModal}
            />
          </div>
        </section>


        <section className={styles.pickup_section}>
          <h1 className={styles.pickup_title}>
            ピックアップ
          </h1>
          <div className={styles.pickup_area}>
            <img className={styles.pickup_photo} src={profile.userPickUpPhoto} alt="#"/>
            <p className={styles.pickup_memo}>{profile.userPickUpDescription}</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default mypage