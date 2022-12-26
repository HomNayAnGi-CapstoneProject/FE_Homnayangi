import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '../actionSlice/globalSlice'

const store = configureStore({
    reducer: {
        global: globalReducer,
    }
})

export default store;
