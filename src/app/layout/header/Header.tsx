"use client"
import React,{useState,useEffect} from 'react'
import {AppBar,Button,Stack, Typography} from "@mui/material"
import Link from 'next/link'
import { useAppSelector,useAppDispatch } from '@/app/redux/store'
import { logOut, resetUser } from '@/app/redux/auth/authSlice'
import { useRouter } from 'next/navigation'
interface Props {
    window?:() => Window
}
const drawerWidth = 240;
const navLinks = [
    {
        name:'Đăng nhập',
        href:'/login'
    },
    {
        name:'Đăng ký',
        href:'/register'
    }
]

export default function Header() {
    const dispatch = useAppDispatch()
    const result = useAppSelector((state) => state.auth)
    const { data } = result;
    const router = useRouter()


    useEffect(() => {
        dispatch(resetUser())
    },[])
  return (
    <AppBar sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",height:"70px",padding:"0 32px"}}>
        <Stack  direction={'row'}>
            <Link className='link-header' href="/">Trang chủ</Link>
        </Stack>
        <Stack sx={{display:'flex',alignItems:'center',justifyContent:'center'}} direction={'row'} gap={'1rem'}>
            {!data.token ? navLinks.map((link,index) => (
                <Link className='link-header' key={index} href={link.href}>{link.name}</Link>
            )) : <>
            <Typography>Xin chào,{data.user?.name}</Typography>
            <Button onClick={() => {dispatch(logOut());router.push('/login')}} sx={{color:'white'}}>Đăng xuất</Button>
            </>}
        </Stack>
    </AppBar>
  )
}
