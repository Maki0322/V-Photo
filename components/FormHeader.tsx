import React from 'react'
import Vphotologo from '../public/Vphotologo.svg'
import Link from 'next/link';
import styles from '../styles/header.module.css'

const FormHeader = () => {
  return (
    <>
      <header>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Vphotologo width="65px" height="auto" cursor="pointer"/>
          </Link>
        </div>

      </header>
    </>
  )
}

export default FormHeader