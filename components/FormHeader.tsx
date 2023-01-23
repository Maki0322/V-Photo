import React from 'react'
import Vphotologo from '../public/Vphotologo.svg'

const FormHeader = () => {
  return (
    <>
      <header>
        {/* <Box p="0 10px 6px 16px" mt="8px"> */}
        <div>
          <Vphotologo width="65px" height="auto" cursor="pointer" />       
        </div>
        {/* </Box> */}
      </header>
    </>
  )
}

export default FormHeader