import { configureStore } from '@reduxjs/toolkit';
import  perfumeReducer from '../redux/slice/perfumeSlice.js';


 export const store = configureStore({
  reducer: {
    perfume: perfumeReducer,
  },
});



