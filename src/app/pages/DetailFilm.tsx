"use client"
import {useEffect,useMemo} from 'react'
import { Box,Stack,Typography,Button } from '@mui/material'
import { useAppDispatch,useAppSelector } from '../redux/store'
import { getFilmThunk } from '../redux/film/filmAction'
import { styled } from "@mui/system";
import { useRouter } from 'next/navigation'
import { resetFilmDetail } from '../redux/film/filmSlice'

interface DetailFilmProps {
    id:string
}

const Wrapper = styled('div')({
    marginTop:'30px',
    width:'100%',
    backgroundColor:'#fff'
  })

  const VideoItem = styled('iframe')({
    width:'620px',
    height:'349px'
})
export default function DetailFilm({id}:DetailFilmProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const resultFilm = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilm;
  const { detailFilm } = dataFilm;

  useEffect(() => {
    dispatch(resetFilmDetail(''))
    dispatch(getFilmThunk(id))
  },[])

  const data = useMemo(() => ({
    name:detailFilm.name,
    director:detailFilm.director,
    actors:detailFilm.actors,
    category:detailFilm.category,
    content:detailFilm.content,
    image:detailFilm.image.replace("\\", "/"),
    startDate:detailFilm.date,
    time:detailFilm.time,
    language:detailFilm.language,
    rated:detailFilm.rated,
    trailer:detailFilm.trailer
  }),[detailFilm])
  console.log(data)
  return (
    <Box sx={{padding:'80px 100px 0 100px'}}>
         <Box sx={{marginBottom:'35px',borderBottom:'3px solid #fff'}}>
            <Typography sx={{marginBottom:'15px',textTransform:'capitalize',fontSize:'24px',color:'#fff'}} variant='h3'>Nội dung phim</Typography>
        </Box>
        <Stack direction={'row'} gap={'20px'}>
        <Box height={268} width={182} sx={{display:'block',zIndex:'100',position:'relative',backgroundImage:`url(${`http://localhost:5000/${data.image}`})`,backgroundSize:'cover',backgroundPosition:'center',margin:'0 5px'}}></Box>
        <Stack direction={'column'} gap={'5px'}>
            <Typography sx={{color:'#fff',fontSize:'20px',fontWeight:'600'}}>{data.name}</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Đạo diễn:{data.director}</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Diễn viên:{data.actors}</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Thể loại:{data.category}</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Khởi chiếu:{data.startDate}</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Thời lượng:{data.time} phút</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Ngôn ngữ:{data.language}</Typography>
            <Typography sx={{color:'#fff',fontSize:'13px'}}>Rated:{data.rated}</Typography>
            <Button onClick={() => router.push(`/booking/${id}`)} sx={{width:'100px'}} variant='contained' color='success'>Mua vé</Button>
        </Stack>
        </Stack>
        <Box sx={{marginTop:'30px',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <VideoItem loading='lazy' src={`${data.trailer}`} frameBorder={'0'} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen />
        </Box>
        <Wrapper dangerouslySetInnerHTML={{__html:data.content ? data.content : ""}}></Wrapper>
        
    </Box>
  )
}
