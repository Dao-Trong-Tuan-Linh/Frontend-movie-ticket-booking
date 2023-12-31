import { createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "@/app/api/baseAxios";

export const createOrderThunk = createAsyncThunk(
    "order/createOrder",
    async(order:any,thunkApi) => {
        try {
            const {data} = await baseAxios.post("/create-order",order)
            const {result} = data
            return result
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg);
        }
    }
)

export const getOrdersByUserThunk = createAsyncThunk(
    "order/getOrdersByUser",
    async (_, thunkApi) => {
      try {
        const { data } = await baseAxios.get("/get-orders-by-user");
        const { result } = data;
        return result;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.response.data.msg);
      }
    }
  );