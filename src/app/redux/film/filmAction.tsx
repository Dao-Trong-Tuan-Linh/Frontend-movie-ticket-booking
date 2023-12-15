import { createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "@/app/api/baseAxios";

export const createFilmThunk = createAsyncThunk(
  "film/createFilm",
  async (film: any, thunkApi) => {
    try {
      const { data } = await baseAxios.post("/create-film", film, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const allFilmsThunk = createAsyncThunk(
  "film/allFilms",
  async (params, thunkApi) => {
    try {
      const { data } = await baseAxios.get("/all-films");
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getFilmThunk = createAsyncThunk(
  "film/getFilm",
  async (id:string, thunkApi) => {
    try {
      const { data } = await baseAxios.get(`/get-film?id=${id}`);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateFilmThunk = createAsyncThunk(
  "film/updateFilm",
  async ({id,film}:{id:string,film:any}, thunkApi) => {
    try {
      const { data } = await baseAxios.put(`/update-film/${id}`,film);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteFilmThunk = createAsyncThunk(
  "film/deleteFilm",
  async (id:string, thunkApi) => {
    try {
      const { data } = await baseAxios.delete(`/delete-film/${id}`);
      const { result } = data;
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);
