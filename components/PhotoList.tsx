import React from 'react'
import { useRecoilValue } from 'recoil'
import Link from 'next/link';

import FavoriteIcon from './FavoriteIcon';
import styles from '../styles/Home.module.css'
import { currentGetPhotosState } from '../state/currentGetPhotosState';


const PhotoList = () => {
  // 表示される写真
  const currentGetPhotos = useRecoilValue(currentGetPhotosState);

  return (
    <>
      {currentGetPhotos.map((data) => (
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

export default PhotoList