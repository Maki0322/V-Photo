import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { collection, CollectionReference, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";

import { styled } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { FavoritePhotosType } from '../../../types/FavoritePhotosType';
import { auth, db } from '../../../firestore/firebase';
import { loginModalShowState } from '../../../state/loginModalShowState';


// FavoriteBorderIconのcss
const MyFavoriteBorderIconWhite = styled(FavoriteBorderIcon)({
  cursor: "pointer",
  padding: "7px",
  fontSize: "32px",
  borderRadius: "18px",
  position: "absolute",
  bottom: "20px",
  right: "20px",
  color:"white",
  zIndex:"20",
  "&:hover": {
    color:"red",
  }
})
const MyFavoriteBorderIconRed = styled(FavoriteBorderIcon)({
  cursor: "pointer",
  padding: "7px",
  fontSize: "32px",
  borderRadius: "18px",
  position: "absolute",
  bottom: "20px",
  right: "20px",
  color:"red",
  zIndex:"20",
})

type Props = {
  id :string;
  title: string,
  ownername: string,
  datetaken: string,
  url_l: string,
  url_m: string,
  tags: string,
}


const FavoriteIcon = ({id,title,url_m,url_l,ownername,datetaken,tags}:Props) => {
  const photoId = id;
  const [favoritePhoto, setFavoritePhoto] =useState<Array<FavoritePhotosType>>([]);

  // firebaseからいいねボタンを押した写真の情報を取得
  useEffect(() => {
    if(!auth.currentUser) return;
    // データの取得
    const postData = collection(db, "users", auth.currentUser.uid, "photos") as CollectionReference<FavoritePhotosType>;
    // リアルタイムでデータを取得する
    onSnapshot(postData, (favos)=> {
      setFavoritePhoto(favos.docs.map((favo) => ({...favo.data()})))
    })
  },[])

    // ログインモーダルの値をrecoilで管理
    const setLoginModalShow = useSetRecoilState(loginModalShowState);

  // いいねボタンを押したときに走る関数
  // いいねする関数
  const handleClickFavoriteIconActive = async() => {
    if(!auth.currentUser) return setLoginModalShow(true);
    const docRef = doc(db, "users", auth.currentUser.uid, "photos", id);
    const data = {
      id: id,
      favorite: true,
      title: title,
      url_m: url_m,
      url_l: url_l,
      ownername: ownername,
      datetaken: datetaken,
      tags: tags,
    }
    await setDoc(docRef ,data);
  };
  // いいねを消す関数
  const handleClickFavoriteIconDelete =async () => {
    if(!auth.currentUser) return;
    deleteDoc(doc(db, "users", auth.currentUser.uid, "photos", photoId))
  }
  // 現在表示されている写真一覧と、いいねを押された写真の情報を照合
  const result = favoritePhoto.some((f) => f.id === photoId);

  if(result){
    return (
      <>
        <MyFavoriteBorderIconRed onClick={handleClickFavoriteIconDelete}/>
      </>
    )
  } else {
    return (
      <>
        <MyFavoriteBorderIconWhite onClick={handleClickFavoriteIconActive}/>
      </>
    )
  }
}

export default FavoriteIcon