import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore';

import styles from '../../../styles/editUserPickUpPhotoModal.module.css'
import { favoritePhotosState } from '../../../state/favoritePhotosState';
import { FavoritePhotosType } from '../../../types/FavoritePhotosType';
import { auth, db } from '../../../firestore/firebase';
import { selectPickUpPhotoState } from '../../../state/selectPickUpPhotoState';
import { MyMuiCloseIcon } from '../../atoms/icons/MyMuiCloseIcon';

type Props = {
  editUserPickUpPhotoModal:boolean, 
  closeEditUserPickUpPhotoModal:() => void,
  openEditPickUpPhotoModal:() => void,
}

const EditUserPickUpPhotoModal = ({editUserPickUpPhotoModal, closeEditUserPickUpPhotoModal,openEditPickUpPhotoModal}:Props) => {

  const [favoritePhotos, setFavoritePhotos] = useRecoilState(favoritePhotosState);

  // firebaseからいいねボタンを押した写真の情報を取得
  useEffect(() => {
    if(!auth.currentUser) return;
    // データの取得
    const postData = collection(db, "users", auth.currentUser.uid, "photos") as CollectionReference<FavoritePhotosType>;
    // リアルタイムでデータを取得する
    onSnapshot(postData, (favos)=> {
      setFavoritePhotos(favos.docs.map((favo) => ({...favo.data()})));
    });
  },[]);

  const setSelectPickUpPhoto = useSetRecoilState(selectPickUpPhotoState);

  const clickPhoto = async(e:any) => {
    console.log(e,"の写真をクリックしました。")
    await setSelectPickUpPhoto(e);
    await closeEditUserPickUpPhotoModal();
    await openEditPickUpPhotoModal();
  };


  if(editUserPickUpPhotoModal) {
    return (
      <>
        <div id={styles.edit_user_pick_up_photo_modal}>
          <div id={styles.edit_user_pick_up_photo_modal_content}>
            <div>
              <MyMuiCloseIcon onClick={closeEditUserPickUpPhotoModal}/>
              <div className={styles.container}>
                {favoritePhotos.map((data) => (
                  <div className={styles.photos} key={data.id}>
                    <img 
                      className={styles.img} 
                      src={data.url_m} 
                      alt="#"
                      onClick={()=>clickPhoto(data.url_l)}
                    />
                  </div>
                ))}
            </div>
            </div>
          </div>
        </div>
      </>
    )
  } else return null;
};

export default EditUserPickUpPhotoModal;