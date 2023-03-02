import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRecoilState } from 'recoil'
import { collection, CollectionReference, onSnapshot } from 'firebase/firestore';

import styles from '../../../styles/Home.module.css'
import { favoritePhotosState } from '../../../state/favoritePhotosState';
import { auth, db } from '../../../firestore/firebase';
import { FavoritePhotosType } from '../../../types/FavoritePhotosType';
import FavoriteIcon from '../../atoms/icons/FavoriteIcon';

const FavoritePhotoList = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      {favoritePhotos.map((data) => (
        <div className={styles.photos} key={data.id}>
          <FavoriteIcon 
            id={data.id}
            tags={data.tags}
            url_m={data.url_m}
            url_l={data.url_l}
            datetaken={data.datetaken}
            ownername={data.ownername}
            title={data.title}
          />
          <Link href={{pathname:"/detail", query:data}}>
            <img 
              className={styles.img} 
              src={data.url_m} 
              alt="#"
            />
          </Link>
        </div>
      ))}
    </>
  )
}

export default FavoritePhotoList;