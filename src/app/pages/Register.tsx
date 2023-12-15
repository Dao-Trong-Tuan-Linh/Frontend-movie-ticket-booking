"use client";
import React,{useEffect} from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import Link from "next/link";
import RegisterForm from "../components/register-form/RegisterForm";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { registerThunk } from "../redux/auth/authAction";
import { IRegister, RegisterParams } from "../redux/auth/authInterface";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


export default function Register() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.auth);
  const { dataAuth, error } = result;

  useEffect(() => {
    if(dataAuth.user) {
      router.push('/login')
    }
  },[dataAuth])
  
  const handleSubmit = (data: RegisterParams) => {
    dispatch(registerThunk(data));
  };
  return (
    <Box
      sx={{
        marginTop: "70px",
        width: "100vw",
        minHeight: "600px",
        height: "100vh",
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RegisterForm onSubmit={handleSubmit}/>
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
      {/* Same as */}
      <ToastContainer />
    </Box>
  );
}
