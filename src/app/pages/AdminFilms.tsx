"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import FilmCard from "../components/film-card/FilmCard";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { allFilmsThunk, deleteFilmThunk, getFilmThunk } from "../redux/film/filmAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetFilmDetail } from "../redux/film/filmSlice";
import DeleteItem from "../components/delete-item/DeleteItem";
import useAdminCheck from "../hooks/useAdminCheck";
import { usePathname } from 'next/navigation'


const Container = styled("div")({
  marginTop: "60px",
  position: "relative",
  width: "100%",
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  backgroundColor:'transparent'
});

export default function AdminFilms() {
  const pathname = usePathname()
  useAdminCheck(pathname)
  
  const [open,setOpen] = useState(false)

  const handleOpen = async (_id:string) => {
    await dispatch(getFilmThunk(_id))
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    dispatch(resetFilmDetail(''))
  }

  const handleDelete = (id:string) => {
    dispatch(deleteFilmThunk(id))
    handleClose()
  }

  const dispatch = useAppDispatch();

  
  const resultFilms = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilms;
  const { allFilms } = dataFilm;
  console.log(allFilms);
  useEffect(() => {
    dispatch(allFilmsThunk());
  }, []);
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          padding: "50px 0",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            position: "relative",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <Box
            sx={{ position: "relative", width: "100%", marginBottom: "20px" }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "600",
                color: "#fff",
              }}
              variant="h1"
            >
              Phim
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {allFilms.map((film) => (
              <FilmCard
                key={film._id}
                _id={film._id}
                name={film.name}
                category={film.category}
                image={film.image.replace("\\", "/")}
                onOpen={handleOpen}
              />
            ))}
          </Box>
        </Box>
      </Box>
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
      <DeleteItem open={open} onSubmit={handleDelete} onClose={handleClose}/>
    </Container>
  );
}
