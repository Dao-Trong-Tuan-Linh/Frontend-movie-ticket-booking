"use client";
import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material";

const ImgFilm = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export default function FilmItem() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative", width: "100%", marginBottom: "5px" }}>
        <a style={{ width: "100%", display: "inline-block" }} href="#">
          <ImgFilm src="../film1.jpg" />
        </a>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          textAlign: "left",
          height:"121px"
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: "16px",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Người vợ cuối cùng
        </Typography>
        <Box sx={{ width: "100%"}}>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", color: "#fff", fontWeight: "600" }}
          >
            Thể loại:
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", color: "#fff" }}
          >
            Tâm lý tình cảm
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", color: "#fff", fontWeight: "600" }}
          >
            Thời lượng:
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", color: "#fff" }}
          >
            132 phút
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", color: "#fff", fontWeight: "600" }}
          >
            Khởi chiếu:
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "14px", color: "#fff" }}
          >
            03-11-2023
          </Typography>
        </Box>
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"10px"}
        sx={{ paddingBottom: "10px" }}
      >
        <Button size="small" variant="contained" color="error">
          Xem thêm
        </Button>
        <Button size="small" variant="contained" color="success">
          Mua vé
        </Button>
      </Stack>
    </Box>
  );
}
