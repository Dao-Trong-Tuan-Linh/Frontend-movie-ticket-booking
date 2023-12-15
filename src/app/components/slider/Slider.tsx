import React from 'react'
import { Box,Container } from '@mui/material'
import 'react-slideshow-image/dist/styles.css'
import {Slide} from "react-slideshow-image"



export default function Slider() {
    const slideImages = [
        './post1.jpg',
        './post2.jpg',
        './post3.jpg'
    ]
  return (
    <Box>
        <Slide autoplay duration={3000} indicators={true}>
            {
                slideImages.map((image,index) => (
                   <Box key={index}>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'500px',backgroundSize:'cover',backgroundImage:`url(${image})`}}></Box>
                   </Box>
                ))
            }
        </Slide>
    </Box>
  )
}
