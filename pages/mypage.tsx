import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Area, MediaSize } from 'react-easy-crop';

import { Box, Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';

import getCroppedImg from '../const/getCroppedImg';
import { ASPECT_RATIO, CROP_WIDTH } from '../const/cropValue';

import Header from '../components/organisms/header/Header'
import CropModal from '../components/organisms/modal/CropModal';
import EditProfileModal from '../components/organisms/modal/EditProfileModal';
import { MyMuiRoundButton } from '../components/atoms/buttons/MyMuiRoundButton';
import EditPickUpPhotoModal from '../components/organisms/modal/EditPickUpPhotoModal';
import EditUserPickUpPhotoModal from '../components/organisms/modal/EditUserPickUpPhotoModal';

import { cropModalShowState } from '../state/cropModalShowState';
import { imgSrcState } from '../state/reactEasyCropState';
import { profileState } from '../state/profileState';

import styles from '../styles/mypage.module.css'
import Flex from '../components/molecules/Flex';
import RightAligned from '../components/molecules/RightAligned';


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



const Mypage = () => {
  const profile = useRecoilValue(profileState);

  // EditProfileモーダルの値をstateで管理
  const [editProfileModal, setEditProfileModal] = useState(false);

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

  const imgSrc = useRecoilValue(imgSrcState);

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
          <Box width={{xs:"90%",sm:"70%",md:"50%"}} margin="0 auto">
            <Flex flexDirection={{xs:'column', md:'row'}}>
              <div className={styles.user_icon}>
                <img src={profile.userIcon} alt="user icon" className={styles.icon}/>
              </div>
              <div>
                <Flex justifyContent="space-between" sx={{marginTop:{xs:"30px",md:"0px"}}}>
                  <div className={styles.user_name}>{profile.userName}</div>
                  <RightAligned>
                  <div className={styles.edit_profile_button}>
                    <MyMuiRoundButton 
                      onClick={openEditProfileModal}
                      sx={{width:"50px"}}
                    >
                      編集
                    </MyMuiRoundButton>
                  </div>

                  </RightAligned>
                  </Flex>
                  <EditProfileModal 
                    editProfileModal={editProfileModal}
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
                <div className={styles.user_memo}>{profile.userMemo}</div>
              </div>
            </Flex>
          </Box>
        </section>
        <section className={styles.pickup_section}>
          <Flex justifyContent="space-between">
            <h1 className={styles.pickup_title}>
              ピックアップ
            </h1>
            <div className={styles.edit_pickup_button}>
              <MyMuiRoundButton
                sx={{width:"50px", margin:"20px"}}
                onClick={openEditPickUpPhotoModal}
              >
                編集
              </MyMuiRoundButton>
            </div>
          </Flex>
          <EditUserPickUpPhotoModal 
            editUserPickUpPhotoModal={editUserPickUpPhotoModal}
            closeEditUserPickUpPhotoModal={closeEditUserPickUpPhotoModal}
            openEditPickUpPhotoModal={openEditPickUpPhotoModal}
          />
          <EditPickUpPhotoModal 
            editPickUpPhotoModal={editPickUpPhotoModal}
            closeEditPickUpPhotoModal={closeEditPickUpPhotoModal}
            openEditUserPickUpPhotoModal={openEditUserPickUpPhotoModal}
          />
          <div className={styles.pickup_area}>
            <div className={styles.pickup_photo_container}>
              <img className={styles.pickup_photo} src={profile.userPickUpPhoto} alt="#"/>
            </div>
            <p className={styles.pickup_memo}>{profile.userPickUpDescription}</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Mypage;