"use client"
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
import LoginForm from "../components/login-form/LoginForm";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginThunk } from "../redux/auth/authAction";
import { LoginParams } from "../redux/auth/authInterface";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/store";


export default function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.auth);
  const { dataAuth, error } = result;

  useEffect(() => {
    if(dataAuth.token) {
      router.push('/')
    }
  },[dataAuth])

  const handleSubmit = (data: LoginParams) => {
    dispatch(loginThunk(data));
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
      <LoginForm onSubmit={handleSubmit}/>
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
