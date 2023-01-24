import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '../actionSlice/globalSlice'
import accountReducer from '../actionSlice/accountSlice'
import managementReducer from "../actionSlice/managementSlice";

const store = configureStore({
    reducer: {
        global: globalReducer,
        account: accountReducer,
        management: managementReducer,
    }
})

export default store;
