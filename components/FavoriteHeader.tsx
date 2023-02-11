import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';
import styles from '../styles/header.module.css'

import Vphotologo from '../public/Vphotologo.svg'
import Link from 'next/link';

// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  fontSize:"35px",
  marginRight:"8px",
  marginTop:"10px",
  borderRadius:"16px",
  padding:"4px",
  backgroundColor: "rgba(195,0,0,0.6)",
  color:"white",

})

// PersonIconのcss
const MyPersonIcon = styled(PersonIcon)({
  cursor: "pointer",
  color:"white",
  fontSize:"30px",
  border:"solid 1px black",
  backgroundColor:"black",
  borderRadius: "30px",
  margin:"14px 5px 5px 5px",
})

const FavoriteHeader = () => {
  return (
    <>
      <header>
        <div  className={styles.header}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <Vphotologo width="65px" height="auto" cursor="pointer"/>
            </Link>
          </div>
          <MyFavoriteBorderIcon />
          <MyPersonIcon />
        </div>
      </header>
    </>
  )
}

export default FavoriteHeader