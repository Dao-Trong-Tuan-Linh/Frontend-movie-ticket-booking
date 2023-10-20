"use client"
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

interface LoginFormProps {
  onSubmit:Function
}

export default function LoginForm({onSubmit}:LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "Trường tên cần có ít nhất 3 ký tự")
        .required("Tên được yêu cầu"),
      password: yup
        .string()
        .min(6, "Mật khẩu cần lớn hơn hoặc bằng 6 ký tự")
        .required("Mật khẩu được yêu cầu"),
    }),
    onSubmit: (values) => {
        onSubmit(values)
    },
  });
  return (
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
          Đăng nhập
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container gap={"1rem"}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                autoFocus
                label="Tên"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Link href="/forgot-password">Quên mật khẩu</Link>
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
                Đăng nhập
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
