import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slicer/slice'
import baseApi from "../Apis/baseapi";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        [baseApi.reducerPath] : baseApi.reducer,
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    
});