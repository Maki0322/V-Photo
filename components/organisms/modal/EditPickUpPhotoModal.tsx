import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

import styles from '../../../styles/editPickUpPhotoModal.module.css'
import { auth, db } from '../../../firestore/firebase';
import { profileState } from '../../../state/profileState';
import { selectPickUpPhotoState } from '../../../state/selectPickUpPhotoState';
import { MyMuiRoundButton } from '../../atoms/buttons/MyMuiRoundButton';
import { MyMuiCloseIcon } from '../../atoms/icons/MyMuiCloseIcon';
import { TextField } from '../../atoms/MyMuiTextField';


type Props = {
  editPickUpPhotoModal:boolean,
  closeEditPickUpPhotoModal:() => void,
  openEditUserPickUpPhotoModal:() => void,
}

const EditPickUpPhotoModal = ({editPickUpPhotoModal,closeEditPickUpPhotoModal,openEditUserPickUpPhotoModal}:Props) => {

  // 仮選択のピックアップフォトの値をuseRecoilで管理
  const [selectPickUpPhoto, setSelectPickUpPhoto] = useRecoilState(selectPickUpPhotoState);


  // プロフィール情報をuseRecoilで管理
  const profile = useRecoilValue(profileState);

  const [editUserPickUpDescription,setEditUserPickUpDescription]=useState(profile.userPickUpDescription);

  const sendEditPickUpPhoto = async() => {
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
  
  const clickCloseEditPickUpPhotoModalIcon = () => {
    closeEditPickUpPhotoModal();
    setSelectPickUpPhoto(profile.userPickUpPhoto);
  }

  if(editPickUpPhotoModal) {
    return (
      <>
        <div id={styles.edit_pick_up_photo_modal}>
          <div id={styles.edit_pick_up_photo_modal_content}>
            <MyMuiCloseIcon onClick={clickCloseEditPickUpPhotoModalIcon}/>
            <img 
              onClick={clickUserPickUpPhoto} 
              src={selectPickUpPhoto} 
              alt="user pick up photo" 
              style={{
                borderRadius:"10px", 
                height:"150px", 
                cursor:"pointer", 
                display:"block",
                margin:"0 auto"
              }}
            />
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
            <MyMuiRoundButton onClick={sendEditPickUpPhoto}>
              保存
            </MyMuiRoundButton>
          </div>
        </div>
      </>
    )
  } else return <></>;
}

export default EditPickUpPhotoModal;