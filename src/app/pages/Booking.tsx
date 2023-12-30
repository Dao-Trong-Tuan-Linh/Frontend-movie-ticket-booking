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
import { createOrderThunk } from "../redux/order/orderAction";

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
  const { allTimes} = dataShowtime;

  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );
  const [time, setTime] = useState("");
  const [dates, setDates] = useState<DateOption[]>([]);
  const [times, setTimes] = useState<ITime[]>([]);
  const [chosenSeats, setChoseSeats] = useState<{ name: string }[]>([]);
  const [money,setMoney] = useState<string>("0")

  
  
  const seats = useMemo(
    () => [
      { name: "S1" },
      { name: "S2" },
      { name: "S3" },
      { name: "S4" },
      { name: "S5" },
      { name: "S6" },
      { name: "S7" },
      { name: "S8" },
      { name: "S9" },
      { name: "S10" },
      { name: "S11" },
      { name: "S12" },
      { name: "S13" },
      { name: "S14" },
      { name: "S15" },
      { name: "S16" },
      { name: "S17" },
      { name: "S18" },
      { name: "S19" },
      { name: "S20" },
      { name: "S21" },
      { name: "S22" },
      { name: "S23" },
      { name: "S24" },
      { name: "S25" },
      { name: "S26" },
      { name: "S27" },
      { name: "S28" },
      { name: "S29" },
      { name: "S30" },
      { name: "S31" },
      { name: "S32" },
    ],
    []
  );

  const seatsType = useMemo(() => [
    {color:'#1b5e20',message:'Ghế bạn đã chọn'},
    {color:'#d32f2f',message:'Ghế người khác đã chọn'},
    {color:'#ed6c02',message:'Ghế thường'},
  ],[])

  const handleChangeDate = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  const handleSelectSeats = (selectedSeatName: string) => {
    const isSeatSelected = chosenSeats.some(
      (seat) => seat.name === selectedSeatName
    );
    if (isSeatSelected) {
      const updateChosenSeats = chosenSeats.filter(
        (seat) => seat.name !== selectedSeatName
      );
      setChoseSeats(updateChosenSeats);
    } else {
      const selectedSeat = seats.find((seat) => seat.name === selectedSeatName);
      if (selectedSeat) {
        setChoseSeats([...chosenSeats, selectedSeat]);
      }
    }
  };
  
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
    dispatch(getTimesThunk({ filmId: id, date }));
  }, [id, date]);

  useEffect(() => {
    setTimes(allTimes);
    if (times) {
      setTime(times[0]?.time);
      setMoney(times[0]?.money)
    }
  }, [allTimes]);
  console.log(times)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createOrderThunk({filmId:id,seats:chosenSeats,total:chosenSeats.length * Number(money)}))
  }
  
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
      <form onClick={handleSubmit}>
      <Stack gap={"20px"}>
        <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "600" }}>
          {data.name}
        </Typography>
        <Stack direction={"column"}>
          <Typography sx={{ color: "#fff" }}>Chọn ngày:</Typography>
          <Select
            sx={{ backgroundColor: "#fff" }}
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
        <Stack direction={"column"}>
          <Typography sx={{ color: "#fff" }}>Chọn giờ:</Typography>
          <Select
            sx={{ backgroundColor: "#fff" }}
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
        <Stack direction={"column"}>
          <Typography sx={{ color: "#fff" }}>Chọn ghế ngồi:</Typography>
          <Box
            sx={{
              padding:'20px',
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "10px",}}>
            {seats.map((seat) => (
              <Button
                key={seat.name}
                variant="contained"
                color={chosenSeats.some(item => item.name === seat.name) ? "success" : "warning"}
                onClick={() => handleSelectSeats(seat.name)}
              >
                {seat.name}
              </Button>
            ))}
            </Box>
            <Stack mt={2} gap={'5px'}>
            {seatsType.map((item) => (
            <Stack direction={'row'}>
            <Box sx={{padding:'6px 16px',backgroundColor:item.color}}></Box>
            <Typography>{item.message}</Typography>
            </Stack>
            ))}
            </Stack>
          </Box>
         
        </Stack>
        <Box sx={{width:'100%',padding:'10px 20px',backgroundColor:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Typography>Tổng tiền:{chosenSeats.length * Number(money)} VNĐ</Typography>
          <Button type="submit" sx={{color:'#fff'}} variant="contained" color="success">Đặt vé</Button>
        </Box>
      </Stack>
      </form>
    </Box>
  );
}
