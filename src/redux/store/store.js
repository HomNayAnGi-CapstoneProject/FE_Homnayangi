import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '../actionSlice/globalSlice'
import accountReducer from '../actionSlice/accountSlice'
import managementReducer from "../actionSlice/managementSlice";
import cartReducer from '../actionSlice/shoppingCartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        global: globalReducer,
        account: accountReducer,
        management: managementReducer,
    }
})

export default store;
