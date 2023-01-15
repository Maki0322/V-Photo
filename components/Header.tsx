import React from 'react'

import { Box, Flex, Spacer } from '@chakra-ui/react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';


import Vphotologo from '../public/Vphotologo.svg'

// FavoriteBorderIconのcss
const MyFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  fontSize:"40px",
  padding:"5px",
  marginRight:"10px",
  marginTop:"12px",
  borderRadius:"16px",
  "&:hover": {
    backgroundColor: "rgba(195,0,0,0.3)",
    color:"white",
    cursor: "pointer",
  }
})

// PersonIconのcss
const MyPersonIcon = styled(PersonIcon)({
  cursor: "pointer",
  color:"white",
  fontSize:"30px",
  border:"solid 1px black",
  backgroundColor:"black",
  borderRadius: "30px",
  margin:"17px 5px 5px 5px",
})



const Header = () => {
  return (
    <header>
      <Flex p="0 10px 6px 16px">
        <Box mt="8px">
          <Vphotologo width="65px" height="auto" cursor="pointer"/>
        </Box>
        <Spacer />
        <MyFavoriteBorderIcon />
        <MyPersonIcon />
      </Flex>
    </header>
  )
}

export default Header