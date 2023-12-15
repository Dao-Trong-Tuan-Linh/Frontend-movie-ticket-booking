"use client"
import React from 'react'
import { Box, Typography, styled } from '@mui/material'



const LinkItem = styled('a')({
    fontSize:'24px',
    color:'#000',
    ':hover':{
        color:'#cd8c3c'
    }
})

interface HomeItemProps {
    name:string,
    link:string,
    icon:React.JSX.Element
}
export default function HomeItem({name,icon,link}:HomeItemProps) {
  return (
    <Box sx={{with:'100%',height:'200px',backgroundColor:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',borderRadius:'10px',marginBottom:'20px'}}>
        <Box sx={{fontSize:'32px'}}>
        {icon}
        </Box>
        <Typography>
            <LinkItem href={link}>{name}</LinkItem>
        </Typography>
    </Box>
  )
}
