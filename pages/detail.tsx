import Head from 'next/head'
import React from 'react'

import { styled } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowLeftSharpIcon from '@mui/icons-material/ArrowLeftSharp';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';

import Header from '../components/Header'
import styles from '../styles/detail.module.css'


// ArrowBackIosNewIconのcss
const MYArrowBackIosNewIcon = styled(ArrowBackIosNewIcon)({
  cursor: "pointer",
  fontSize: "40px",
  margin: "10px",
  color: "rgb(110, 110, 110)",
  "&:hover": {
    color:"rgb(170, 170, 170)",
  }
})
// ArrowForwardIosIconのcss
const MYArrowForwardIosIcon = styled(ArrowForwardIosIcon)({
  cursor: "pointer",
  fontSize: "40px",
  margin: "10px",
  color: "rgb(110, 110, 110)",
  "&:hover": {
    color:"rgb(170, 170, 170)",
  }
})
// ArrowLeftSharpIconのcss
const MYArrowLeftSharpIcon = styled(ArrowLeftSharpIcon)({
  cursor: "pointer",
  fontSize: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  color: "black",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  }
})
// ArrowRightSharpIconのcss
const MYArrowRightSharpIcon = styled(ArrowRightSharpIcon)({
  cursor: "pointer",
  fontSize: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  color: "black",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  }
})
// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  cursor: "pointer",
  fontSize: "30px",
  borderRadius: "18px",
  color: "rgb(110, 110, 110)",
  zIndex:"10",
  "&:hover": {
    color:"red",
  }
})
// DownloadSharpIconのcss
const MyDownloadSharpIcon = styled(DownloadSharpIcon)({
  cursor: "pointer",
  fontSize: "30px",
  borderRadius: "18px",
  color: "rgb(110, 110, 110)",
  zIndex:"10",
  "&:hover": {
    color:"rgb(30, 30, 30)",
  }
})
// LaunchSharpIconのcss
const MyLaunchSharpIcon = styled(LaunchSharpIcon)({
  cursor: "pointer",
  fontSize: "16px",
  color:"black",
  "&:hover": {
    color:"rgb(80, 80, 80)",
  }
})



const detail = () => {
  return (
    <>
      <Head>
        <title>詳細ページ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/VPhotoIcon2.ico" />
      </Head>
      <Header />
      <div className={styles.content_area}>
        <div className={styles.photo_area}>
          {/* pc表示の矢印アイコン */}
          <div className={styles.pc_back_icon}>
            <MYArrowBackIosNewIcon/>
          </div>
          {/* mobile表示の矢印アイコン */}
          <div className={styles.mobile_back_icon}>
            <MYArrowLeftSharpIcon />
          </div>

          <img className={styles.photo} src='https://live.staticflickr.com/65535/52333400007_9228b6ac3d_b.jpg' alt='#' />
      
          {/* pc表示の矢印アイコン */}
          <div className={styles.pc_forward_icon}>
            <MYArrowForwardIosIcon />
          </div>
          {/* mobile表示の矢印アイコン */}
          <div className={styles.mobile_forward_icon}>
            <MYArrowRightSharpIcon />
          </div>
        </div>
        <div className={styles.icon_area}>
          <div className={styles.photo_like_icon}>
            <MyFavoriteBorderIcon />
          </div>
          <div className={styles.photo_download_icon}>
            <MyDownloadSharpIcon />
          </div>
        </div>
      </div>

      <div className={styles.description_area}>
        <div className={styles.poster_area}>
          <p className={styles.poster_name_index}>投稿者</p>
          <p className={styles.poster_name}>Valorant Champions Tour Photos</p>
        </div>
        <div className={styles.shooting_date_area}>
          <p className={styles.shooting_date_index}>撮影日</p>
          <p className={styles.shooting_date}>2022/9/4</p>
        </div>
        <div className={styles.flickr_detailpage_link_area}>
          <p className={styles.flickr_detailpage_link_index}>掲載元</p>
          <p>
            <a  className={styles.flickr_detailpage_link} target="_blank"  rel="noopener noreferrer" href='https://www.flickr.com/photos/valorantesports/52333400007/in/album-72177720301833779/'>
              flickr.com
              <MyLaunchSharpIcon />
            </a>
          </p>
        </div>
      </div>
    </>
  )
}


export default detail