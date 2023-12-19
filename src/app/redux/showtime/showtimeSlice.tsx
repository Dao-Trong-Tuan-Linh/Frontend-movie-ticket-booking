import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { allShowtimeThunk, createShowtimeThunk, deleteShowtimeThunk, singleShowtimeThunk, updateShowtimeThunk } from "./showtimeAction";
import { toast } from "react-toastify";
import { IShowtime, ShowtimeState } from "./showtimeInterface";

const initialShowtimeState: ShowtimeState = {
  loading: false,
  dataShowtime: {
    allShowtime: [],
    detailShowtime: {
      _id: "",
      filmId: "",
      date: "",
      time: "",
      available: false,
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
        available: false,
        money: "",
      };
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(singleShowtimeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(singleShowtimeThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.dataShowtime.detailShowtime = action.payload;
    });
    builder.addCase(
      singleShowtimeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload);
      }
    );
    builder.addCase(createShowtimeThunk.fulfilled, (state, action) => {
      state.dataShowtime.allShowtime = [
        action.payload,
        ...state.dataShowtime.allShowtime,
      ];
    });
    builder.addCase(
      createShowtimeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error(action.payload);
      }
    );
    builder.addCase(updateShowtimeThunk.fulfilled,(state,action) => {
            
      const payload = action.payload as IShowtime
      const prevAllShowtime = state.dataShowtime.allShowtime
      const newAllShowtime = prevAllShowtime.map((showtime) => {
        return showtime._id === payload._id ? payload : showtime
      })
      state.dataShowtime.allShowtime = newAllShowtime
      toast.success(`Đã cập nhật thành công`)
    })
    builder.addCase(
      updateShowtimeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error(action.payload);
      }
    );
    builder.addCase(deleteShowtimeThunk.fulfilled,(state,action) => {
      const payload = action.payload as string
      const prevAllShowtime = state.dataShowtime.allShowtime
      const newAllShowtime = prevAllShowtime.filter((showtime) => showtime._id !== payload)
      state.dataShowtime.allShowtime = newAllShowtime
      toast.success(`Đã xóa ${payload} thành công`)
    })
    builder.addCase(
      deleteShowtimeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        toast.error(action.payload);
      }
    );
  },
});

const { reducer: showtimeReducer } = showtimeSlice;
export const { resetShowtimeDetail } = showtimeSlice.actions;

export { showtimeReducer };
