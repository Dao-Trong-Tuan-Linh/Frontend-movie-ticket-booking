import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


interface MoviesSectionProps {
  title:string
}
export default function MoviesSection({title}:MoviesSectionProps) {
  const films = [
    {
      name:'Người vợ cuối cùng',
      img:'./film1.jpg',
      age:'T18'
    },
    {
      name:'Những kỷ nguyên của Taylor Switch',
      img:'./film2.jpg',
      age:'T13'
    },
    {
      name:'Đất rừng phương nam',
      img:'./film3.jpg',
      age:'K'
    },
    {
      name:'Hòn đảo kỳ bí',
      img:'./film4.jpg',
      age:'P'
    }
  ]
  return (
    <Box sx={{padding:'30px 15px',width:'100%',backgroundColor:'#fff',marginBottom:"60px"}}>
        <Typography variant='h4' sx={{textAlign:'center',textTransform:'uppercase'}}>{title}</Typography>
        <Slide slidesToScroll={1} slidesToShow={4} autoplay={false} cssClass='gap-10'>
            {films.map((film,index) => (
              <Box key={index} height={390} sx={{position:'relative',backgroundImage:`url(${film.img})`,backgroundSize:'cover',backgroundPosition:'center',margin:'0 5px'}}>
                <Stack sx={{position:'absolute',bottom:'0',left:'0',backgroundColor:'#222222',width:'100%'}}>
                  <Typography variant='h3' sx={{overflow:'hidden',whiteSpace:'nowrap',textAlign:'center',fontSize:'20px',color:'#fff',fontWeight:'600',lineHeight:'48px'}}>{film.name}</Typography>
                  <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={'10px'} sx={{paddingBottom:'10px'}}>
                    <Button variant='contained' color='error'>Xem thêm</Button>
                    <Button variant='contained' color='success'>Mua vé</Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
        </Slide>
        <Link href="#">
        <Typography sx={{marginTop:'1rem',textAlign:'center',textTransform:'capitalize',color:'#f26b38'}}>xem thêm ^^</Typography>
        </Link>
    </Box>
  )
}
