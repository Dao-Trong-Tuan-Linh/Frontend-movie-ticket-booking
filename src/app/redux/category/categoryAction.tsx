import { createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "@/app/api/baseAxios";
import { CategoryParams } from "./categoryInterface";


export const getCategoriesThunk = createAsyncThunk(
    'category/getCategories',
    async(params,thunkApi) => {
        try {
            const {data} = await baseAxios.get('/get-categories')
            const {result} = data
            return result
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const getCategoryThunk = createAsyncThunk(
    'category/getCategory',
    async(id:string,thunkApi) => {
        try {
            const {data} = await baseAxios.get(`/get-category?id=${id}`)
            const {result} = data
            return result
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const createCategoryThunk = createAsyncThunk(
    'category/createCategory',
    async(params:CategoryParams,thunkApi) => {
        try {
            const {data} = await baseAxios.post('/create-category',params);
            const {result} = data;
            return result
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)

export const updateCategoryThunk = createAsyncThunk(
    'category/updateCategory',
    async({ id, params }: { id: string, params: CategoryParams },thunkApi) => {
        try {
            const {data} = await baseAxios.put(`/update-category?id=${id}`,params);
            const {result} = data;
            return result
        } catch (error:any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data.msg)
            
        }
    }
)

export const deleteCategoryThunk = createAsyncThunk(
    'category/deleteCategory',
    async(id:string,thunkApi) => {
        try {
            const {data} = await baseAxios.delete(`/delete-category?id=${id}`);
            const {result} = data;
            return result
        } catch (error:any) {
            return thunkApi.rejectWithValue(error.response.data.msg)
        }
    }
)