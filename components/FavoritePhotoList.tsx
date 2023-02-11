import { collection, CollectionReference, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'
import { auth, db } from '../firestore/firebase';
import { favoritePhotosState } from '../state/favoritePhotosState'
import FavoriteIcon, { FavoritePhotosType } from './FavoriteIcon';
import styles from '../styles/Home.module.css'

const FavoritePhotoList = () => {
  const [favoritePhotos, setFavoritePhotos] = useRecoilState(favoritePhotosState);

  // firebaseからいいねボタンを押した写真の情報を取得
  useEffect(() => {
    // if(!auth.currentUser) return;
    if(!auth.currentUser) console.log("ユーザー情報がありません");
    // データの取得
    const postData = collection(db, "users", auth.currentUser.uid, "photos") as CollectionReference<FavoritePhotosType>;
    // リアルタイムでデータを取得する
    onSnapshot(postData, (favos)=> {
      setFavoritePhotos(favos.docs.map((favo) => ({...favo.data()})));
    });
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

export default FavoritePhotoList