import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

// import productSlice from "./productSlice";
import { authSlice } from "./AuthSlice";
import { ProductSlice } from "./productSlice";

export const store = configureStore({
    reducer : {
      Auth : authSlice,  
      products : ProductSlice,
      // datum: AuthSlice,
    }
})
