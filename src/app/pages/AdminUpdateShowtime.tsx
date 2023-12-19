"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { styled } from "@mui/system";
import { Box, Button, Stack, TextField, Typography,FormControlLabel,Switch } from "@mui/material";
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
import { allFilmsThunk } from "../redux/film/filmAction";
import useAdminCheck from "../hooks/useAdminCheck";
import { usePathname, useRouter } from "next/navigation";
import { IFilm } from "../redux/film/filmInterface";
import { createShowtimeThunk, singleShowtimeThunk, updateShowtimeThunk } from "../redux/showtime/showtimeAction";
import { resetShowtimeDetail } from "../redux/showtime/showtimeSlice";

const Container = styled("div")({
  position: "relative",
  width: "100%",
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
  backgroundColor: "#fff",
});

interface Props {
  id: string;
}
export default function AdminUpdateShowtime({ id }: Props) {
  const pathname = usePathname();
  useAdminCheck(pathname);

  const [film, setFilm] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [money, setMoney] = useState("");
  const [films, setFilms] = useState<IFilm[]>([]);
  const [available,setAvailable] = useState(false)

  const router = useRouter()

  const resultShowtime = useAppSelector((state) => state.showtime);
  const { dataShowtime } = resultShowtime;
  const { detailShowtime } = dataShowtime;

  const resultFilms = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilms;
  const { allFilms } = dataFilm;

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setFilm(event.target.value as string);
  };
  useEffect(() => {
    if (date) {
      setStartDate(`${date.date() < 10 ? `0${date.date()}` : `${date.date()}`}/${date.month() + 1 < 10 ? `0${date.month() + 1}` : `${date.month() + 1}`}/${date.year()}`);
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
    dispatch(singleShowtimeThunk(id));
    dispatch(allFilmsThunk())
  }, []);

  useEffect(() => {
    if (detailShowtime) {
      const arrDate = detailShowtime.date.split("/")
      setFilm(detailShowtime.filmId)
      setFilms(allFilms)
      setDate(dayjs(`${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`))
      setTime(dayjs(`${arrDate[2]}-${arrDate[1]}-${arrDate[0]}T${detailShowtime.time}`))
      setAvailable(detailShowtime.available)
      setMoney(detailShowtime.money)
    }
  }, [detailShowtime]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const showtime = {filmId:film,date:startDate,time:startTime,available,money}
    dispatch(updateShowtimeThunk({id,showtime}));
    dispatch(resetShowtimeDetail(''))
    router.push('/admin/showtime')
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
              Sửa lịch chiếu
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
                <FormControlLabel
                  control={
                    <Switch
                      checked={available}
                      onChange={(e) => setAvailable(e.target.checked)}
                    />
                  }
                  label="Trạng thái"
                />
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
                  Sửa
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
