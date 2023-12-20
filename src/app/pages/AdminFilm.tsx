"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { styled } from "@mui/system";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { getFilmThunk, updateFilmThunk } from "../redux/film/filmAction";
import { getCategoriesThunk } from "../redux/category/categoryAction";
import { ICategory } from "../redux/category/categoryInterface";
import { useRouter } from "next/navigation";
import { resetFilmDetail } from "../redux/film/filmSlice";
import useAdminCheck from "../hooks/useAdminCheck";
import { usePathname } from 'next/navigation'


const Container = styled("div")({
  position: "relative",
  width: "100%",
  backgroundColor: "#fff",
  marginRight: "auto",
  marginLeft: "auto",
  paddingLeft: "15px",
  paddingRight: "15px",
});

interface AdminFilmProps {
  id: string;
}

export default function AdminFilm({ id }: AdminFilmProps) {
  const pathname = usePathname()
  useAdminCheck(pathname)

  const [filmName, setFilmName] = useState("");
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState("");
  const [language, setLanguage] = useState("");
  const [rated, setRated] = useState("");
  const [trailer, setTrailer] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const router = useRouter()

  const resultFilm = useAppSelector((state) => state.film);
  const { dataFilm } = resultFilm;
  const { detailFilm } = dataFilm;
  
  const resultCategories = useAppSelector((state) => state.category);
  const { dataCategory } = resultCategories;
  const { allCategories } = dataCategory;

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  useEffect(() => {
    if (detailFilm) {
      const arr = detailFilm.date.split("/");
      setFilmName(detailFilm.name);
      setDirector(detailFilm.director);
      setActors(detailFilm.actors);
      setCategory(detailFilm.category);
      setContent(detailFilm.content);
      setTime(detailFilm.time.toString());
      setLanguage(detailFilm.language);
      setTrailer(detailFilm.trailer);
      setRated(detailFilm.rated);
      setDate(dayjs(`${arr[2]}-${arr[1]}-${arr[0]}`));
    }
  }, [detailFilm, allCategories]);

  useEffect(() => {
    if (date) {
      setStartDate(`${date.year()}-${date.month() + 1 < 10 ? `0${date.month() + 1}` : `${date.month() + 1}`}-${date.date() < 10 ? `0${date.date()}` : `${date.date()}`}`);
    }
  }, [date]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getFilmThunk(id));
  }, []);

  useEffect(() => {
    if (allCategories) {
      setCategories(allCategories);
    }
  }, [allCategories]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", filmName);
    data.append("director", director);
    data.append("actors", actors);
    data.append("time", time);
    data.append("category", category);
    data.append("date", startDate);
    data.append("content", content);
    data.append("language", language);
    data.append("rated", rated);
    data.append("trailer", trailer);

    dispatch(updateFilmThunk({id,film:data}))
    dispatch(resetFilmDetail(''))
    router.push('/admin/films')
    setFilmName("");
    setDirector("");
    setActors("");
    setContent("");
    setStartDate("");
    setLanguage("");
    setRated("");
    setTrailer("");
    setTime("");
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
              Sửa phim
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
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Tên phim"
                  value={filmName}
                  onChange={(e) => setFilmName(e.target.value)}
                />
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Đạo diễn"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Diễn viên"
                  value={actors}
                  onChange={(e) => setActors(e.target.value)}
                />
                <TextField
                  type="number"
                  fullWidth
                  placeholder="Thời lượng"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày khởi chiếu"
                        format="DD/MM/YYYY"
                        onChange={setDate}
                        value={date}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
                <ReactQuill value={content} onChange={setContent} />
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Ngôn ngữ"
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                />
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Rated"
                  onChange={(e) => setRated(e.target.value)}
                  value={rated}
                />
                <TextField
                  type="text"
                  fullWidth
                  placeholder="Trailer"
                  onChange={(e) => setTrailer(e.target.value)}
                  value={trailer}
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
