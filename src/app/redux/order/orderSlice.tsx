import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getOrdersByUserThunk } from "./orderAction";
import { toast } from "react-toastify";
import { IUserShowtime,ISeats, OrderState } from "./orderInterface";

const initialOrderState:OrderState = {
    loading:false,
    dataOrder:{
        userShowtime:[]
    }
}

export const orderSlice = createSlice({
    name:"order",
    initialState:initialOrderState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder.addCase(getOrdersByUserThunk.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(getOrdersByUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.dataOrder.userShowtime = action.payload;
          });
          builder.addCase(
            getOrdersByUserThunk.rejected,
            (state, action: PayloadAction<any>) => {
              state.loading = false;
              toast.error(action.payload);
            }
          );
    }
})

const {reducer:orderReducer} = orderSlice
export const {} = orderSlice.actions

export {orderReducer}