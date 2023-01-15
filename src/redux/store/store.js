import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '../actionSlice/globalSlice'
import accountReducer from '../actionSlice/accountSlice'

const store = configureStore({
    reducer: {
        global: globalReducer,
        account: accountReducer,
    }
})

export default store;
