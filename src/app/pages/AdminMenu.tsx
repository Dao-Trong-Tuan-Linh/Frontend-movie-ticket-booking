"use client"
import { useState,useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteItem from "../components/delete-item/DeleteItem";
import { getMenusThunk } from "../redux/menu/menuAction";
import MenuTable from "../components/menu-table/MenuTable";

export default function AdminMenu() {
  const dispatch = useAppDispatch()
  const resultMenu = useAppSelector((state) => state.menu)
  const {dataMenu} = resultMenu
  const {allMenu} = dataMenu

  useEffect(() => {
    dispatch(getMenusThunk())
  },[])
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "80px 100px 0 100px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}
        >
          Danh sách menu
        </Typography>
      </Box>
      <MenuTable allMenu={allMenu}/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  )
}
