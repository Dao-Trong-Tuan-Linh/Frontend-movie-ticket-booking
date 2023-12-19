"use client"
import { Box } from '@mui/material'
import Slider from "../components/slider/Slider";
import MoviesSection from '../components/movies-section/MoviesSection';
import { usePathname } from 'next/navigation'
import useAdminCheck from '../hooks/useAdminCheck';


export default function Main() {
  const pathname = usePathname()
  useAdminCheck(pathname)
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

