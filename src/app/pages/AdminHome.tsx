"use client";
import React, { useEffect,useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Box, Grid } from "@mui/material";
import HomeItem from "../components/home-item/HomeItem";
import { FaFilm } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { RiSlideshow2Line } from "react-icons/ri";
import useAdminCheck from "../hooks/useAdminCheck";
import { usePathname } from 'next/navigation'


export default function AdminHome() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.auth);
  const { dataAuth, error } = result;

  const pathname = usePathname()
  useAdminCheck(pathname)
  
  const menusAdmin = useMemo(() => [
    {
      name:'Menu',
      link:'/admin/menu',
      icon:<MdMenu/>
    },
    {
      name:'Danh mục',
      link:'/admin/categories',
      icon:<CiBoxList/>
    },
    {
      name:'Danh sách phim',
      link:'/admin/films',
      icon:<FaFilm/>
    },
    {
      name:'Thêm phim',
      link:'/admin/create-film',
      icon:<IoMdAdd/>
    },
    {
      name:'Lịch chiếu',
      link:'/admin/showtimes',
      icon:<RiSlideshow2Line/>
    }
  ],[])

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "80px 100px 0 100px",
      }}
    >
      <Grid container justifyContent={'space-between'}>
        {
          menusAdmin.map((item,index) => (
            <Grid key={index}  xs={2.5}>
          <HomeItem icon={item.icon} name={item.name} link={item.link}/>
        </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}
