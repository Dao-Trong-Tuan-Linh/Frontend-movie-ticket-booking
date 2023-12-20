import { createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "@/app/api/baseAxios";

export const createShowtimeThunk = createAsyncThunk(
  "showtime/createShowTime",
  async (showtime: any, thunkApi) => {
    try {
      const { data } = await baseAxios.post("/create-showtime", showtime);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const allShowtimeThunk = createAsyncThunk(
  "showtime/allShowTime",
  async (_, thunkApi) => {
    try {
      const { data } = await baseAxios.get("/all-showtime");
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getTimesThunk = createAsyncThunk(
  "showtime/getTimes",
  async ({filmId,date}:{filmId:string,date:string}, thunkApi) => {
    try {
      const { data } = await baseAxios.get(`/get-times?filmId=${filmId}&date=${date}`);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const rowNowShowingThunk = createAsyncThunk(
  "showtime/rowNowShowing",
  async (_, thunkApi) => {
    try {
      const { data } = await baseAxios.get("/row-now-showing");
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
)

export const rowComingSoonThunk = createAsyncThunk(
  "showtime/rowComingSoon",
  async (_, thunkApi) => {
    try {
      const { data } = await baseAxios.get("/row-coming-soon");
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
)

export const singleShowtimeThunk = createAsyncThunk(
  "showtime/updateShowTime",
  async (id:string, thunkApi) => {
    try {
      const { data } = await baseAxios.get(`/get-showtime?id=${id}`);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateShowtimeThunk = createAsyncThunk(
  "showtime/updateShowtime",
  async ({id,showtime}:{id:string,showtime:any}, thunkApi) => {
    try {
      const { data } = await baseAxios.put(`/update-showtime/${id}`,showtime);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteShowtimeThunk = createAsyncThunk(
  "showtime/deleteShowtime",
  async (id:string, thunkApi) => {
    try {
      const { data } = await baseAxios.delete(`/delete-showtime/${id}`);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);