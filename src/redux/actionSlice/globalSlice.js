import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        openMenuModal: false,
        openCategoryMenuModal: false,
        activeCate: 0,
        countrySide: 1,
        sugesstFormData: {},
        openFormSuggest: false,
        subCategoryList: [],
    },
    reducers: {
        setOpenMenuModal: (state, action) => {
            state.openMenuModal = action.payload;
        },
        setOpenCategoryMenuModal: (state, action) => {
            state.openCategoryMenuModal = action.payload;
        },
        setActiveCate: (state, action) => {
            state.activeCate = action.payload;
        },
        setOpenFormSuggest: (state, action) => {
            state.openFormSuggest = action.payload;
        },
        setCountrySide: (state, action) => {
            state.countrySide = action.payload;
        },
        setSubCategoryList: (state, action) => {
            state.subCategoryList = action.payload;
        },
        setSuggestFormData: (state, action) => {
            state.sugesstFormData = action.payload
            localStorage.setItem('FORM_SUGGEST', JSON.stringify({
                Age: parseInt(action.payload.Age),
                IsMale: action.payload.IsMale,
                IsLoseWeight: action.payload.IsLoseWeight
            }))
        },
        getSuggestData: (state, action) => {
            state.sugesstFormData = JSON.parse(localStorage.getItem('FORM_SUGGEST'))
            let currentData = JSON.parse(localStorage.getItem('FORM_SUGGEST'))

            if (!currentData) {
                state.sugesstFormData = currentData
            }
        },
    }
})

export const { setCountrySide, setOpenMenuModal, setSuggestFormData, getSuggestData, setOpenFormSuggest,
    setOpenCategoryMenuModal, setActiveCate, setSubCategoryList } = globalSlice.actions
export default globalSlice.reducer
