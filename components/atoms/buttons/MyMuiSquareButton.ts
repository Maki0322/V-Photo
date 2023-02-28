import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const MyMuiSquareButton = styled(Button)({
  marginBottom:"10px",
  color:"black",
  fontWeight:"bold",
  backgroundColor:"RGB(210, 210, 210)",
  "&:hover": {
    backgroundColor:"RGB(62, 140, 236)",
    color:"white",
  }
})