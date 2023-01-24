import { createSlice } from "@reduxjs/toolkit";
import instances from "../../utils/plugin/axios";

export const managementSlice = createSlice({
    name: 'management',
    initialState: {
        showHeader: false,
    },
    reducers: {
        setShowHeader: (state, action) => {
            state.showHeader = action.payload
        }
    }
})

export const { setShowHeader } = managementSlice.actions;
export default managementSlice.reducer;
