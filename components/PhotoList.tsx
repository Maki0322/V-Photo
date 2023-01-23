import React, { useState } from 'react'
import { FlickrApiType } from '../types/FlickrApi'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/system';
import { useRecoilState,useRecoilValue } from 'recoil'
import { itemsPerPageState } from '../state/itemsPerPageState'
import { itemsOffsestState } from '../state/itemsOffsestState'

import styles from '../styles/Home.module.css'


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

type Props = {
  allPhotos: FlickrApiType[];
  // currentPhotos: FlickrApiType[];
  // pageNumber: number
  // totalCount: number
}

const PhotoList = ({allPhotos}:Props) => {
  const itemsPrePage = useRecoilValue(itemsPerPageState);
  const itemsOffsest = useRecoilValue(itemsOffsestState);
  const endOffset = itemsOffsest + itemsPrePage;
  const currentPhotos = allPhotos.slice(itemsOffsest, endOffset);
  return (
    <>
      {/* {allPhotos.map((data) => ( */}
      {currentPhotos.map((data) => (
        <div className={styles.photos} key={data.id}>
          <img 
            className={styles.img} 
            src={data.url_m} 
            alt="#"
          />
          <MyFavoriteBorderIcon />
        </div>
      ))}

    </>
  )
}

export default PhotoList