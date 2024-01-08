import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./Api/apiSlice";
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    api: apiReducer,
   
  },
  middleware:[thunk],
});

