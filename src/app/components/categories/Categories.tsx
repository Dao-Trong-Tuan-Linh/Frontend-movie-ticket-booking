"use client"
import React from 'react'
import { Box,Typography,Checkbox,Stack,FormGroup,FormControlLabel } from '@mui/material'
export default function Categories() {
  return (
    <Box sx={{width:'200px',position:'fixed',padding:'15px 0 15px 30px',borderRadius:'10px',background:'#fff',display:'flex',alignItems:'flex-start',flexDirection:'column'}}>
        <Typography sx={{fontSize:'24px',fontWeight:'600'}}>Thể loại</Typography>
        <FormGroup>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
            <FormControlLabel control={<Checkbox/>} label="label"/>
        </FormGroup>
    </Box>
  )
}
