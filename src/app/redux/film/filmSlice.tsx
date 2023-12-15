import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allFilmsThunk, deleteFilmThunk, getFilmThunk, updateFilmThunk } from "./filmAction";
import {toast} from "react-toastify"
import { FilmState, IFilm } from "./filmInterface";


const initialFilmState:FilmState = {
    loading:false,
    dataFilm:{
        allFilms:[],
        detailFilm:{
            _id:"",
            name:"",
            director:"",
            actors:"",
            time:0,
            category:"",
            date:"",
            image:"",
            content:"",
            language:"",
            rated:"",
            trailer:""
        },
    },
};

export const filmSlice = createSlice({
    name:'film',
    initialState:initialFilmState,
    reducers:{
        resetFilmDetail:(state,action) => {
            state.dataFilm.detailFilm = {
                _id:"",
                name:"",
                director:"",
                actors:"",
                time:0,
                category:"",
                date:"",
                image:"",
                content:"",
                language:"",
                rated:"",
                trailer:""
            }
        }
    },
    extraReducers:(builder) => {
        builder.addCase(allFilmsThunk.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(allFilmsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.dataFilm.allFilms = action.payload;
          });
          builder.addCase(
            allFilmsThunk.rejected,
            (state, action: PayloadAction<any>) => {
              state.loading = false;
              toast.error(action.payload);
            }
          );
          builder.addCase(
            getFilmThunk.pending,(state,action) => {
                state.loading = true;
            }
          )
          builder.addCase(
            getFilmThunk.fulfilled,(state,action) => {
                state.loading = false;
                state.dataFilm.detailFilm = action.payload
            }
          )
          builder.addCase(
            getFilmThunk.rejected,(state,action: PayloadAction<any>) => {
                state.loading = false;
                state.dataFilm.detailFilm = action.payload
            }
          )
          builder.addCase(updateFilmThunk.fulfilled,(state,action) => {
            
            const payload = action.payload as IFilm
            const prevFilms = state.dataFilm.allFilms
            const newFilms = prevFilms.map((film) => {
              return film._id === payload._id ? payload : film
            })
            state.dataFilm.allFilms = newFilms
            toast.success(`Đã cập nhật ${payload.name} thành công`)
          })
          builder.addCase(
            updateFilmThunk.rejected,
            (state, action: PayloadAction<any>) => {
              toast.error(action.payload);
            }
          );
          builder.addCase(deleteFilmThunk.fulfilled,(state,action) => {
            const payload = action.payload as IFilm
            const prevFilms = state.dataFilm.allFilms
            const newFilms = prevFilms.filter((film) => film._id !== payload._id)
            state.dataFilm.allFilms = newFilms
            toast.success(`Đã xóa ${payload.name} thành công`)
          })
          builder.addCase(
            deleteFilmThunk.rejected,
            (state, action: PayloadAction<any>) => {
              toast.error(action.payload);
            }
          );

    }
})

const {reducer:filmReducer} = filmSlice
export const {resetFilmDetail} = filmSlice.actions

export {filmReducer}