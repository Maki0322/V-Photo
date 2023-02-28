import { doc, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'

import { useRecoilState } from 'recoil';
import { auth, db } from '../firestore/firebase';
import { profileState } from '../state/profileState';
import { selectPickUpPhotoState } from '../state/selectPickUpPhotoState';
import styles from '../styles/editPickUpPhotoModal.module.css'
import { MyMuiRoundButton } from './atoms/buttons/MyMuiRoundButton';
import { MyMuiCloseIcon } from './atoms/icons/MyMuiCloseIcon';
import { TextField } from './atoms/MyMuiTextField';

type Props = {
  editPickUpPhotoModal:boolean,
  openEditPickUpPhotoModal:() => void,
  closeEditPickUpPhotoModal:() => void,
  openEditUserPickUpPhotoModal:() => void,
}

const EditPickUpPhotoModal = ({editPickUpPhotoModal,openEditPickUpPhotoModal,closeEditPickUpPhotoModal,openEditUserPickUpPhotoModal}:Props) => {

  // 仮選択のピックアップフォトの値をuseRecoilで管理
  const [selectPickUpPhoto, setSelectPickUpPhoto] = useRecoilState(selectPickUpPhotoState);


  // プロフィール情報をuseRecoilで管理
  const [profile, setProfile] = useRecoilState(profileState);


  const [editUserPickUpDescription,setEditUserPickUpDescription]=useState(profile.userPickUpDescription);

  const sendEditPickUpPhoto = async(e:React.MouseEvent<HTMLInputElement>) => {
    if(!auth.currentUser)return; 
    // ブラウザ上で記入したprofileをfirebaseに送信
    const profileEdit = doc(db, "users", auth.currentUser.uid);
    await updateDoc(profileEdit, {
      userPickUpDescription:editUserPickUpDescription,
      userPickUpPhoto:selectPickUpPhoto,
    })
    closeEditPickUpPhotoModal();
  }
  const clickUserPickUpPhoto = async() => {
    await closeEditPickUpPhotoModal();
    await openEditUserPickUpPhotoModal();
  };

  if(editPickUpPhotoModal) {
    return (
      <>
        <div id={styles.edit_pick_up_photo_modal}>
          <div id={styles.edit_pick_up_photo_modal_content}>
            <MyMuiCloseIcon onClick={closeEditPickUpPhotoModal}/>

            <img onClick={clickUserPickUpPhoto} src={selectPickUpPhoto} alt="user pick up photo" style={{borderRadius:"10px", height:"150px", cursor:"pointer", display:"block",margin:"0 auto"}}/>
            <TextField 
              label="ピックアップの写真について"
              fullWidth={true}
              variant="outlined"
              disabled={false}
              size="small"
              margin="normal"
              rows={3}
              onChange={(e) => setEditUserPickUpDescription(e.target.value)}
              defaultValue={profile.userPickUpDescription}
            />

            <MyMuiRoundButton onClick={sendEditPickUpPhoto}>保存</MyMuiRoundButton>

          </div>
        </div>
      </>
    )
  } else null;
}

export default EditPickUpPhotoModal