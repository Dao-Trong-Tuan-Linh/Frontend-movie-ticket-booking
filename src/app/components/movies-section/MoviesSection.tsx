"use client"
import { INowShowing } from '@/app/redux/showtime/showtimeInterface';
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useState,useMemo} from 'react'



interface MoviesSectionProps {
  title:string,
  data:INowShowing[],
  isBooking:boolean
}
export default function MoviesSection({title,data,isBooking}:MoviesSectionProps) {
  const router = useRouter()
  const films = useMemo(() => data.map(film => ({
    id:film._id,
    name:film.name,
    image:film.image.replace("\\", "/")
  })),[data])

  return (
    <Box sx={{padding:'30px 15px',width:'100%',backgroundColor:'#fff',marginBottom:"60px"}}>
        <Typography variant='h4' sx={{textAlign:'center',textTransform:'uppercase'}}>{title}</Typography>
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            {films.map((film) => (
              <Box sx={{width:'33%'}}>
                <Box key={film.id} height={390} sx={{display:'block',zIndex:'100',position:'relative',backgroundImage:`url(${`http://localhost:5000/${film.image}`})`,backgroundSize:'cover',backgroundPosition:'center',margin:'0 5px'}}>
                <Stack sx={{position:'absolute',bottom:'0',left:'0',backgroundColor:'#222222',width:'100%'}}>
                  <Typography variant='h3' sx={{overflow:'hidden',whiteSpace:'nowrap',textAlign:'center',fontSize:'20px',color:'#fff',fontWeight:'600',lineHeight:'48px'}}>{film.name}</Typography>
                  <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={'10px'} sx={{paddingBottom:'10px'}}>
                    <Button onClick={() => router.push(`/${film.id}`)} variant='contained' color='error'>Xem thêm</Button>
                    {isBooking && <Button variant='contained' color='success'>Mua vé</Button>}
                  </Stack>
                </Stack>
              </Box>
              </Box>
            ))}
        </Box>
        <Link href="#">
        <Typography sx={{marginTop:'1rem',textAlign:'center',textTransform:'capitalize',color:'#f26b38'}}>xem thêm ^^</Typography>
        </Link>
    </Box>
  )
}
