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
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from "next/navigation";
import { forgotPasswordThunk } from "../redux/auth/authAction";



export default function ForgotPassword() {
    const router = useRouter()
  const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
          email:""
        },
        validationSchema: yup.object({
          email: yup
            .string()
            .email("Địa chỉ email không hợp lệ")
            .required("Tên được yêu cầu"),
        }),
        onSubmit: (values) => {
          dispatch(forgotPasswordThunk(values))
          router.push('/sent-email')
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
            Gửi email để lấy lại mật khẩu
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container gap={"1rem"}>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  autoFocus
                  label="Email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{
                    height: "48px",
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "green",
                    },
                  }}
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Gửi email
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  )
}
