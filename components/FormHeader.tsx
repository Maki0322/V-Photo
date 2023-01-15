import React from 'react'
import { Box } from '@chakra-ui/react';
import Vphotologo from '../public/Vphotologo.svg'

const FormHeader = () => {
  return (
    <>
      <header>
        <Box p="0 10px 6px 16px" mt="8px">
          <Vphotologo width="65px" height="auto" cursor="pointer" />       
        </Box>
      </header>
    </>
  )
}

export default FormHeader