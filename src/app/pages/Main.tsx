"use client"
import { Box } from '@mui/material'
import Slider from "../components/slider/Slider";
import MoviesSection from '../components/movies-section/MoviesSection';
import { usePathname } from 'next/navigation'
import useAdminCheck from '../hooks/useAdminCheck';
import { useAppDispatch,useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { rowNowShowingThunk,rowComingSoonThunk } from '../redux/showtime/showtimeAction';

export default function Main() {
  const resultShowtime = useAppSelector((state) => state.showtime);
  const { dataShowtime } = resultShowtime;
  const { nowShowing,comingSoon } = dataShowtime;

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(rowNowShowingThunk())
    dispatch(rowComingSoonThunk())
  },[])
  console.log(nowShowing)
  
  return (
    <Box sx={{padding:'60px 100px 0 100px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <Box sx={{width:'100%'}}>
        <Slider/>
      </Box>
      <MoviesSection title='phim đang chiếu rạp' data={nowShowing} isBooking={true}/>
      <MoviesSection title='phim sắp chiếu rạp' data={comingSoon} isBooking={false}/>
    </Box>
  )
}

