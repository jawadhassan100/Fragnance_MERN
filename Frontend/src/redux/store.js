import { configureStore } from '@reduxjs/toolkit';
import  perfumeReducer from '../redux/slice/perfumeSlice.js';
import customPerfumeReducer from '../redux/slice/customPerfumeSlice.js';
import bundleReducer from '../redux/slice/bundleSlice.js';

 export const store = configureStore({
  reducer: {
    perfume: perfumeReducer,
    customPerfume: customPerfumeReducer,
    bundle:bundleReducer,
  },
});



