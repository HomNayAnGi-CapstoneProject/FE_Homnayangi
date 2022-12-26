import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        openMenuModal: false,
        countrySide: 1
    },
    reducers: {
        setOpenMenuModal: (state, action) => {
            state.openMenuModal = action.payload;
        },
        setCountrySide: (state, action) => {
            state.countrySide = action.payload;
        }
    }
})

export const { setCountrySide, setOpenMenuModal } = globalSlice.actions
export default globalSlice.reducer
