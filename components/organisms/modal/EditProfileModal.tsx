import React, { useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { doc, updateDoc } from 'firebase/firestore';
import { Area, MediaSize } from 'react-easy-crop';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import { auth, db } from '../../../firestore/firebase';
import CropModal from './CropModal';
import { cropModalShowState } from '../../../state/cropModalShowState';
import { profileState } from '../../../state/profileState';
import { imgSrcState } from '../../../state/reactEasyCropState';
import getCroppedImg from '../../../const/getCroppedImg';
import {TextField} from '../../atoms/MyMuiTextField';
import { MyMuiRoundButton } from '../../atoms/buttons/MyMuiRoundButton';
import { MyMuiCloseIcon } from '../../atoms/icons/MyMuiCloseIcon';
import styles from '../../../styles/editProfileModal.module.css'
import { ASPECT_RATIO, CROP_WIDTH } from '../../../const/cropValue';
import RightAligned from '../../molecules/RightAligned';


type Props = {
  editProfileModal:boolean;
  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;
}


const EditProfileModal = ({editProfileModal,openEditProfileModal,closeEditProfileModal}:Props) => {
  // プロフィール情報をuseRecoilで管理
  const profile = useRecoilValue(profileState);
  // クロップモーダルの値をrecoilで管理
  const setCropModalShow = useSetRecoilState(cropModalShowState);

  /**
   * ファイルアップロード後
   * 画像ファイルのURLをセットしモーダルを表示する
   */
  const reader = new FileReader();
  const onFileChange = 
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        await openEditProfileModal()
        await reader.addEventListener("load", () => {
        if (reader.result) {
          setImgSrc(reader.result.toString() || "");
          setCropModalShow(true);
        }
        });
        reader.readAsDataURL(e.target.files[0]);
        closeEditProfileModal()
      }
    };

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

  const [ editUserName, setEditUserName ] = useState(profile.userName);
  const [ editUserMemo, setEditUserMemo ] = useState(profile.userMemo);

  // 編集したプロフールをfirebaseに送信する
  const sendEditProfile = async() => {
    if(!auth.currentUser)return; 
    // ブラウザ上で記入したprofileをfirebaseに送信
    const profileEdit = doc(db, "users", auth.currentUser.uid);
    await updateDoc(profileEdit, {
      userName:editUserName,
      userMemo:editUserMemo,
    })
    closeEditProfileModal();
  };

  if(editProfileModal){
    return (
      <>
        <div id={styles.edit_profile_modal} >
          <div id={styles.edit_profile_modal_content}>
            <RightAligned>
              <MyMuiCloseIcon onClick={closeEditProfileModal} />
            </RightAligned>
            <label>
              <div style={{position:"relative"}}>
                <AddAPhotoOutlinedIcon sx={{color:"white",position:"absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%)", fontSize:"35px", cursor:"pointer"}}/>
                <img src={profile.userIcon} alt="user icon" style={{borderRadius:"50px", width:"100px", cursor:"pointer", display:"block",margin:"0 auto"}}/>
                <input
                  accept="image/*" 
                  multiple 
                  type="file" 
                  style={{ display: "none" }}
                  onChange={onFileChange} 
                />
              </div>
            </label>
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
            <TextField 
              label="名前"
              fullWidth={true}
              variant="outlined"
              disabled={false}
              size="small"
              margin="normal"
              onChange={(e) => setEditUserName(e.target.value)}
              defaultValue={profile.userName}
            />
            <TextField 
              label="ひとこと"
              fullWidth={true}
              variant="outlined"
              disabled={false}
              size="small"
              margin="normal"
              onChange={(e) => setEditUserMemo(e.target.value)}
              multiline
              rows={3}
              defaultValue={profile.userMemo}
            />
            <RightAligned>
              <MyMuiRoundButton onClick={sendEditProfile}>保存</MyMuiRoundButton>
            </RightAligned>
          </div>
        </div>
      </>
    )
  } else return null;
}

export default EditProfileModal;