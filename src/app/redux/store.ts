import {configureStore} from "@reduxjs/toolkit"
import {useDispatch,useSelector} from "react-redux"
import type {TypedUseSelectorHook} from "react-redux"
import { authReducer } from "./auth/authSlice"
import { menuReducer } from "./menu/menuSlice"
import { categoryReducer } from "./category/categorySlice"
import { filmReducer } from "./film/filmSlice"

 const store = configureStore({
    reducer:{
        auth:authReducer,
        menu:menuReducer,
        category:categoryReducer,
        film:filmReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store

