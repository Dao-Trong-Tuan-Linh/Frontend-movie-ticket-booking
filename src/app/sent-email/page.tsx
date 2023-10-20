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

export default function page() {
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
            Đã gửi tin nhắn thành công.Vui lòng kiểm tra email để lấy lại mật khẩu
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
