import React from 'react'
import { TextField as MyMuiTextField } from '@mui/material';
import { TextFieldProps as MyMuiTextFieldProps } from "@mui/material";

export type TextFieldProps = MyMuiTextFieldProps & {};

export const TextField = (props:TextFieldProps) => {
  return(
    <MyMuiTextField
      label={props.label}
      fullWidth={props.fullWidth}
      variant={props.variant}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      size={props.size}
      margin={props.margin}
      onChange={props.onChange}
      sx={props.sx}
      multiline={props.multiline}
      rows={props.rows}
    />
  )
};

