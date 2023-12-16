"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { styled } from "@mui/system";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "react-quill/dist/quill.snow.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { allFilmsThunk} from "../redux/film/filmAction";
import useAdminCheck from "../hooks/useAdminCheck";
import { usePathname } from "next/navigation";
import { IFilm } from "../redux/film/filmInterface";
import { createShowtimeThunk } from "../redux/showtime/showtimeAction";

const Container = styled("div")({
  position: "relative",
  width: "100%",
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  backgroundColor: "#fff",
});

export default function AdminCreateShowtime() {
  const pathname = usePathname();
  useAdminCheck(pathname);

  const [film, setFilm] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [money, setMoney] = useState("");
  const [films, setFilms] = useState<IFilm[]>([]);

  const resultFilms = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilms;
  const { allFilms } = dataFilm;

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setFilm(event.target.value as string);
  };
  useEffect(() => {
    if (date) {
      setStartDate(`${date.date()}/${date.month() + 1}/${date.year()}`);
    }
    if (time) {
      setStartTime(
        `${time.hour() < 10 ? `0${time.hour()}` : time.hour()}:${
          time.minute() < 10 ? `0${time.minute()}` : time.minute()
        }`
      );
    }
  }, [date, time]);

  useEffect(() => {
    dispatch(allFilmsThunk());
  }, []);

  useEffect(() => {
    if (allFilms) {
      setFilms(allFilms);
    }
  }, [allFilms]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("filmId", film);
    data.append("date", startDate);
    data.append("time", startTime);
    data.append("money", money);
    dispatch(createShowtimeThunk(data));
    setFilm("")
    setDate(null)
    setTime(null)
    setMoney("")
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          padding: "100px 0 150px",
          marginLeft: "-15px",
          marginRight: "-15px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              mb: "30px",
            }}
          >
            <Typography align="center" fontWeight={"600"} variant="h5">
              Thêm lịch chiếu
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              position: "relative",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack direction={"column"} gap={"20px"}>
                <InputLabel id="demo-simple-select-label">Chọn phim</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={film}
                  label="Age"
                  onChange={handleChange}
                >
                  {films.map((film) => (
                    <MenuItem key={film._id} value={film._id}>
                      {film.name}
                    </MenuItem>
                  ))}
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Ngày chiếu"
                      format="DD/MM/YYYY"
                      onChange={setDate}
                      value={date}
                    />
                  </DemoContainer>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="Giờ chiếu"
                      format="HH:mm"
                      onChange={setTime}
                      value={time}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Tiền/1 vé"
                  onChange={(e) => setMoney(e.target.value)}
                  value={money}
                />
                <Button
                  type="submit"
                  sx={{ textAlign: "center", marginTop: "10px" }}
                  color="success"
                  variant="contained"
                >
                  Thêm mới
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
