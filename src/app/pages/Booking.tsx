"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { getFilmThunk } from "../redux/film/filmAction";
import { styled } from "@mui/system";
import { getTimesThunk } from "../redux/showtime/showtimeAction";
import { ITime } from "../redux/showtime/showtimeInterface";

const Wrapper = styled("div")({
  marginTop: "30px",
  width: "100%",
  backgroundColor: "#fff",
});

const VideoItem = styled("iframe")({
  width: "620px",
  height: "349px",
});

interface BookingProps {
  id: string;
}
interface DateOption {
  value: string;
  label: string;
}
export default function Booking({ id }: BookingProps) {
  const dispatch = useAppDispatch();
  const resultFilm = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilm;
  const { detailFilm } = dataFilm;

  const resultShowtime = useAppSelector((state) => state.showtime);
  const { dataShowtime } = resultShowtime;
  const { allTimes } = dataShowtime;

  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const [time,setTime] = useState("")
  const [dates, setDates] = useState<DateOption[]>([]);
  const [times,setTimes] = useState<ITime[]>([])
  const handleChangeDate = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };
  console.log(dates);
  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const dateOptions = [];

      for (let i = 0; i <= 30; i++) {
        const dateOption = new Date();
        dateOption.setDate(today.getDate() + i);

        const formattedDate = dateOption.toISOString().slice(0, 10);
        dateOptions.push({ value: formattedDate, label: formattedDate });
      }

      setDates(dateOptions);
    };

    generateDates();
  }, []);

  useEffect(() => {
    dispatch(getFilmThunk(id));
    dispatch(getTimesThunk({filmId:id,date}))
  }, [id,date]);

  useEffect(() => {
    setTimes(allTimes)
    if(times) {
        setTime(times[0]?.time)
    }
  },[allTimes])

  const data = useMemo(
    () => ({
      name: detailFilm.name,
      director: detailFilm.director,
      actors: detailFilm.actors,
      category: detailFilm.category,
      content: detailFilm.content,
      image: detailFilm.image.replace("\\", "/"),
      startDate: detailFilm.date,
      time: detailFilm.time,
      language: detailFilm.language,
      rated: detailFilm.rated,
      trailer: detailFilm.trailer,
    }),
    [detailFilm]
  );
  console.log(data);
  return (
    <Box sx={{ padding: "80px 100px 0 100px" }}>
      <Box sx={{ marginBottom: "35px", borderBottom: "3px solid #fff" }}>
        <Typography
          sx={{
            marginBottom: "15px",
            textTransform: "capitalize",
            fontSize: "24px",
            color: "#fff",
          }}
          variant="h3"
        >
          Đặt vé
        </Typography>
      </Box>
      <Stack gap={'20px'}>
        <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "600" }}>
          {data.name}
        </Typography>
          <Stack direction={'column'}>
            <Typography sx={{color:'#fff'}}>Chọn ngày:</Typography>
          <Select
          sx={{backgroundColor:'#fff'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label="Chọn ngày"
            onChange={handleChangeDate}
          >
            {dates.map((date) => (
              <MenuItem key={date.value} value={date.value}>
                {date.label}
              </MenuItem>
            ))}
          </Select>
          </Stack>
          <Stack direction={'column'}>
            <Typography sx={{color:'#fff'}}>Chọn giờ:</Typography>
          <Select
          sx={{backgroundColor:'#fff'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="Chọn giờ"
            onChange={handleChangeTime}
          >
            {times.map((time) => (
              <MenuItem key={time.time} value={time.time}>
                {time.time}
              </MenuItem>
            ))}
          </Select>
          </Stack>
      </Stack>
    </Box>
  );
}
