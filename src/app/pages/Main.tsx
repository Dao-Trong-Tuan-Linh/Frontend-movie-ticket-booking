"use client"
import { Box } from '@mui/material'
import Categories from "../components/categories/Categories";
import Slider from "../components/slider/Slider";

import React from 'react'
import MoviesSection from '../components/movies-section/MoviesSection';

export default function Main() {
  return (
    <Box sx={{padding:'60px 100px 0 100px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <Box sx={{width:'100%'}}>
        <Slider/>
      </Box>
      <MoviesSection title='phim đang chiếu rạp'/>
      <MoviesSection title='phim sắp chiếu rạp'/>
    </Box>
  )
}

