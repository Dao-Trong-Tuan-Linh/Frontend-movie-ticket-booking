import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allShowtimeThunk, createShowtimeThunk } from "./showtimeAction";
import { toast } from "react-toastify";
import { ShowtimeState } from "./showtimeInterface";

const initialShowtimeState: ShowtimeState = {
  loading: false,
  dataShowtime: {
    allShowtime: [],
    detailShowtime: {
      _id: "",
      filmId: "",
      date: "",
      time: "",
      money: "",
    },
  },
};

export const showtimeSlice = createSlice({
  name: "showtime",
  initialState: initialShowtimeState,
  reducers: {
    resetShowtimeDetail: (state, action) => {
      state.dataShowtime.detailShowtime = {
        _id: "",
        filmId: "",
        date: "",
        time: "",
        money: "",
      };
    },
  },
  extraReducers:(builder) => {
    builder.addCase(allShowtimeThunk.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(allShowtimeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dataShowtime.allShowtime = action.payload;
      });
      builder.addCase(
        allShowtimeThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
        }
      );
      builder.addCase(createShowtimeThunk.fulfilled, (state, action) => {
        state.dataShowtime.allShowtime = [
          action.payload,
          ...state.dataShowtime.allShowtime
        ];
      });
      builder.addCase(
        createShowtimeThunk.rejected,
        (state, action: PayloadAction<any>) => {
          toast.error(action.payload);
        }
      );

  }
});

const {reducer:showtimeReducer} = showtimeSlice
export const {resetShowtimeDetail} = showtimeSlice.actions

export {showtimeReducer}
