import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        openMenuModal: false,
        openCategoryMenuModal: false,
        openCategoryShopModal: false,
        activeCate: 0,
        activeShopCate: 0,
        countrySide: 1,
        sugesstFormData: {},
        openFormSuggest: false,
        subCategoryList: [],
        returnUrl: '',
        openNotification: false,
        previousUrl: '',
        homeSearchInput: '',
        parentCommentId: '',
        authorAccomId: '',
        connection: null,
        newNoti: false,
    },
    reducers: {
        setOpenMenuModal: (state, action) => {
            state.openMenuModal = action.payload;
        },
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        setNewNoti: (state, action) => {
            state.newNoti = action.payload;
        },
        setParentCommentId: (state, action) => {
            state.parentCommentId = action.payload;
        },
        setAuthorAccomId: (state, action) => {
            state.authorAccomId = action.payload;
        },
        setHomeSearchInput: (state, action) => {
            state.homeSearchInput = action.payload;
        },
        setOpenNotification: (state, action) => {
            state.openNotification = action.payload;
        },
        setOpenCategoryMenuModal: (state, action) => {
            state.openCategoryMenuModal = action.payload;
        },
        setOpenCategoryShopModal: (state, action) => {
            state.openCategoryShopModal = action.payload;
        },
        setActiveCate: (state, action) => {
            state.activeCate = action.payload;
        },
        setActiveShopCate: (state, action) => {
            state.activeShopCate = action.payload;
        },
        setReturnUrl: (state, action) => {
            state.returnUrl = action.payload;
        },
        setPreviousUrl: (state, action) => {
            state.previousUrl = action.payload;
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
    setOpenCategoryMenuModal, setActiveCate, setSubCategoryList, setReturnUrl, setOpenCategoryShopModal,
    setActiveShopCate, setOpenNotification, setPreviousUrl, setHomeSearchInput, setParentCommentId,
    setAuthorAccomId, setConnection, setNewNoti } = globalSlice.actions
export default globalSlice.reducer
