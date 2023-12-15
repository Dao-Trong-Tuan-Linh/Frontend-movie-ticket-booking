import {createAsyncThunk} from "@reduxjs/toolkit"
import baseAxios from "@/app/api/baseAxios"
import {getLocalToken,removeLocalToken,removeLocalUser,setLocalToken,setLocalUser } from "../../util/localstorage"
import { LoginParams, RegisterParams } from "./authInterface";

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (params:RegisterParams,thunkApi) => {
        try {
            const {data} = await baseAxios.post('/register',params);
            const {result} = data;
            setLocalUser(JSON.stringify(result));
            return result;
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (params:LoginParams,thunkApi) => {
        try {
            const {data} = await baseAxios.post('/login',params);
            const {result} = data;
            setLocalUser(JSON.stringify(result.user));
            setLocalToken(JSON.stringify(result.token));
            return result;
        } catch (error:any) {
            console.log("error:",error)
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const forgotPasswordThunk = createAsyncThunk(
    'auth/forgotPassword',
    async (params:{email:string},thunkApi) => {
        try {
            const {data} = await baseAxios.post('/forgot-password',params);
            const {result} = data;
            return result;
        } catch (error:any) {
            
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const changePasswordThunk = createAsyncThunk(
    'auth/changePassword',
    async (params:{id:string,data:{password:string,confirmPassword:string}},thunkApi) => {
        try {
            const {data} = await baseAxios.post(`/change-password/${params.id}`,params.data);
            const {result} = data;
            return result;
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

