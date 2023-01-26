import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/system';

import styles from '../styles/Home.module.css'
import { currentGetPhotosState } from '../state/currentGetPhotosState';
import { filterPhotosState } from '../state/filterPhotosState';
import Link from 'next/link';


// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  cursor: "pointer",
  padding: "7px",
  fontSize: "32px",
  borderRadius: "18px",
  position: "absolute",
  bottom: "20px",
  right: "20px",
  color:"white",
  zIndex:"10",
  "&:hover": {
    color:"red",
  }
})

const PhotoList = () => {
  // 表示される写真
  const currentGetPhotos = useRecoilValue(currentGetPhotosState);

  return (
    <>
      {currentGetPhotos.map((data) => (
        <div className={styles.photos} key={data.id}>
          <Link href={{pathname:"/detail", query:data}}>
            <img 
              className={styles.img} 
              src={data.url_m} 
              alt="#"
            />
            <MyFavoriteBorderIcon />
          </Link>
        </div>
      ))}
    </>
  )
}

export default PhotoList