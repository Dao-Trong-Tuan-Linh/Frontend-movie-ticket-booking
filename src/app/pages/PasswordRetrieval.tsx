"use client"
import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { changePasswordThunk } from "../redux/auth/authAction";


interface PasswordRetrievalProps {
    id:string
}
export default function PasswordRetrieval({id}:PasswordRetrievalProps) {
    const router = useRouter()
  const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
          password: "",
          confirmPassword: "",
        },
        validationSchema: yup.object({
          password: yup
            .string()
            .min(6, "Mật khẩu cần có ít nhất 6 ký tự")
            .required("Tên được yêu cầu"),
          confirmPassword: yup
            .string()
            .min(6, "Mật khẩu cần có ít nhất 6 ký tự")
            .required("Mật khẩu được yêu cầu"),
        }),
        onSubmit: (values) => {
            const params = {id,data:{password:values.password,confirmPassword:values.confirmPassword}}
         dispatch(changePasswordThunk(params))
         router.push('/login')
        },
      });
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
      <Container
        maxWidth="sm"
        sx={{
          padding: "24px 32px",
          width: "400px",
          backgroundColor: "white",
          borderRadius: "16px",
        }}
      >
        <Typography></Typography>
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "32px",
              marginBottom: "24px",
            }}
          >
            Đặt lại mật khẩu
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container gap={"1rem"}>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <TextField fullWidth autoFocus label="Mật khẩu mới của bạn" name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}/>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <TextField fullWidth autoFocus label="Nhập lại mật khẩu mới của bạn" name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}/>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{
                    height: "48px",
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "600",
                    '&:hover':{
                      backgroundColor:"green"
                    }
                  }}
                  type="submit"
                  disabled={!(formik.isValid  && formik.values.password === formik.values.confirmPassword)}
                >
                  Thay đổi 
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  )
}
