import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cropModalShowState } from '../state/cropModalShowState';
import { imgSrcState } from '../state/reactEasyCropState';
import { Area, MediaSize } from 'react-easy-crop';
import styles from '../styles/editProfileModal.module.css'
import CropModal from './CropModal';
import { MyCloseIcon } from './LoginModal';
import { ASPECT_RATIO, CROP_WIDTH } from '../pages/mypage';
import getCroppedImg from '../const/getCroppedImg';

type Props = {
  editProfileModal:boolean;
  toggleEditProfileModal: () => void;
  closeEditProfileModal: () => void;
}

const EditProfileModal = ({editProfileModal,toggleEditProfileModal,closeEditProfileModal}:Props) => {

  // クロップモーダルの値をrecoilで管理
  const setCropModalShow = useSetRecoilState(cropModalShowState);

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
        await reader.readAsDataURL(e.target.files[0]);
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





  if(editProfileModal){
    return (
      <>
        <div id={styles.edit_profile_modal} onClick={closeEditProfileModal} >
          <div id={styles.edit_profile_modal_content}>
            <MyCloseIcon onClick={closeEditProfileModal} />
            <div>モーダル</div>
            <div>
              <input type="file" accept="image/*" onChange={onFileChange} />
            </div>
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




          </div>
        </div>
      </>
    )
  } else return null;
}

export default EditProfileModal