"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  allFilmsThunk,
  deleteFilmThunk,
  getFilmThunk,
} from "../redux/film/filmAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdminCheck from "../hooks/useAdminCheck";
import { usePathname } from "next/navigation";
import { allShowtimeThunk } from "../redux/showtime/showtimeAction";
import ShowtimeTable from "../components/showtime-table/ShowtimeTable";

const Container = styled("div")({
  marginTop: "60px",
  position: "relative",
  width: "100%",
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  backgroundColor: "transparent",
});

export type FilmObjectType = {
  [id: string]: string; // ID là chuỗi và giá trị là chuỗi
};

export default function AdminShowtime() {
  const pathname = usePathname();
  useAdminCheck(pathname);

  const [obj, setObj] = useState<FilmObjectType>({});
  const dispatch = useAppDispatch();

  const resultFilms = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilms;
  const { allFilms } = dataFilm;

  const resultShowtime = useAppSelector((state) => state.showtime);
  const { dataShowtime } = resultShowtime;
  const { allShowtime } = dataShowtime;

  console.log(allFilms);
  useEffect(() => {
    dispatch(allFilmsThunk());
    dispatch(allShowtimeThunk());
  }, []);

  useEffect(() => {
    let updatedObj: { [key: string]: string } = {};

    allFilms.forEach((film) => {
      const { _id, name } = film;
      updatedObj[_id] = name;
    });

    setObj(updatedObj);
  }, [allFilms]);

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
          Danh sách lịch chiếu
        </Typography>
      </Box>
      <ShowtimeTable allShowtime={allShowtime} obj={obj} />
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
  );
}
