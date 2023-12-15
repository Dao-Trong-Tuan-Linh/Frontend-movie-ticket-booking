import {createAsyncThunk} from "@reduxjs/toolkit"
import baseAxios from "@/app/api/baseAxios"
import { IMenu } from "./menuInterface";


export const getMenusThunk = createAsyncThunk(
    'menu/getMenus',
    async (params,thunkApi) => {
        try {
            const {data} = await baseAxios.get('/get-menus');
            const {result} = data;
            return result;
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const getMenuThunk = createAsyncThunk(
    'menu/getMenu',
    async(id:string,thunkApi) => {
        try {
            const {data} = await baseAxios.get(`/get-menu?id=${id}`);
            const {result} = data;
            return result;
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const updateMenuThunk = createAsyncThunk(
    'menu/updateMenu',
    async({id,menu}:{id:string,menu:any},thunkApi) => {
        try {
            const {data} = await baseAxios.put(`/update-menu/${id}`,menu);
            const {result} = data;
            return result;
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)



