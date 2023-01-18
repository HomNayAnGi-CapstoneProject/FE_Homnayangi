import { createSlice } from "@reduxjs/toolkit";
import instances from "../../utils/plugin/axios";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accountInfo: {},
        showModal: false,
    },
    reducers: {
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
            localStorage.setItem('ACCOUNT_INFO', JSON.stringify({
                avatar: action.payload.Avatar,
                displayName: action.payload.Displayname,
                firstName: action.payload.Firstname,
                lastName: action.payload.Lastname,
                phoneNumber: action.payload.PhoneNumber,
                email: action.payload.email,
                gender: action.payload.gender
            }))
        },
        getAccountInfo: (state, action) => {
            state.accountInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))
            let currentAccInfo = JSON.parse(localStorage.getItem('ACCOUNT_INFO'))

            if (!currentAccInfo) {
                state.accountInfo = currentAccInfo
            }
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload
        }
    }
})

export const { setAccountInfo, getAccountInfo, setShowModal } = accountSlice.actions;
export default accountSlice.reducer;
