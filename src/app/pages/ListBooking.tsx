"use client"
import { Box, Stack, Typography } from '@mui/material'
import {useEffect} from 'react'
import { useAppDispatch,useAppSelector } from '../redux/store'
import { getOrdersByUserThunk } from '../redux/order/orderAction'

export default function ListBooking() {
    const dispatch = useAppDispatch()
    const resultOrders = useAppSelector((state) => state.order)
    const {dataOrder} = resultOrders
    const {userShowtime} = dataOrder

    useEffect(() => {
        dispatch(getOrdersByUserThunk())
    },[])
  return (
   <Box sx={{padding:'80px 100px 0 100px'}}>
    <Typography sx={{textAlign:'center',fontSize:'24px',color:'#fff',fontWeight:'600',marginBottom:'10px'}}>Lịch chiếu phim của bạn</Typography>
    <Typography sx={{textAlign:'center',fontSize:'24px',color:'#fff',fontWeight:'600',marginBottom:'10px'}}>Chúc bạn xem phim vui vẻ ^^</Typography>
    <Stack direction={'column'} gap={'10px'}>
        {userShowtime.map((order) => (
            <Box sx={{padding:'20px',backgroundColor:'#fff'}}>
            <Typography>Tên phim:{order.filmName}</Typography>
            <Typography>Ngày chiếu:{order.startDate}</Typography>
            <Typography>Giờ chiếu:{order.startTime}</Typography>
            <Typography>Tên ghế:{order.seats.map(item => item.name).join(',')}</Typography>
        </Box>
        ))}
    </Stack>
   </Box>
  )
}
