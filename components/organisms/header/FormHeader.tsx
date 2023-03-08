import React from 'react'
import Link from 'next/link';
import Vphotologo from '../../../public/vphotologo.svg'
import styles from '../../../styles/header.module.css'

const FormHeader = () => {
  return (
    <>
      <header>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Vphotologo width="65px" height="45.94px" cursor="pointer"/>
          </Link>
        </div>
      </header>
    </>
  )
}

export default FormHeader