import React from 'react'
import { Box } from '@mui/material';
import { BoxProps as MyMuiBoxProps } from '@mui/material';

type BoxProps = MyMuiBoxProps & {};

const Flex = (props:BoxProps) => {
  return (
    <>
      <Box 
        display="flex"
        justifyContent= {props.justifyContent}
        flexDirection={props.flexDirection}
        margin={props.margin}
        padding={props.padding}
        sx={props.sx}
      >
        {props.children}
      </Box>
    </>
  )
}

export default Flex;