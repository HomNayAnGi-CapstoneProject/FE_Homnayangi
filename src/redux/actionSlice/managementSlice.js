import { createSlice } from "@reduxjs/toolkit";
import instances from "../../utils/plugin/axios";

export const managementSlice = createSlice({
    name: 'management',
    initialState: {
        showSideBar: true,
        blogContent: null
        // mainCategory: '',
        // subCategory: [],
        // subCateDataList: [],
        // coverImage: null,
        // title: '',
        // description: {},
        // ingredients: [],
        // preparation: {},
        // processing: {},
        // finished: {},
        // blogId: '',
        // videoUrl: '',
        // authorId: '',
        // blogStatus: 2, // (DELETED: 0, ACTIVE: 1, DRAFT:2, PENDING: 3)
        // maxSize: 0,
        // minSize: 0,
        // packagePrice: 1,
        // cookedPrice: 1
        // totalKcal: 1
        ,
        blogSubCategory: [],
        blogId: null,
        uploadBlog: false,
        currentOrderStatus: -1,
        confirmPackage: false,
        reportData: null,
        reportFilterMonth: new Date().getMonth() + 1,
        reportFilterYear: new Date().getFullYear(),
        reportFilterDateFrom: '',
        reportFilterDateTo: '',
        reportType: 1
    },
    reducers: {
        setConfirmPackage: (state, action) => {
            state.confirmPackage = action.payload
        },
        setReportTypee: (state, action) => {
            state.reportType = action.payload
        },
        setReportFilterMonth: (state, action) => {
            state.reportFilterMonth = action.payload
        },
        setReportFilterDateFrom: (state, action) => {
            state.reportFilterDateFrom = action.payload
        },
        setReportFilterDateTo: (state, action) => {
            state.reportFilterDateTo = action.payload
        },
        setReportFilterYear: (state, action) => {
            state.reportFilterYear = action.payload
        },
        setReportData: (state, action) => {
            state.reportData = action.payload
        },
        setShowSideBar: (state, action) => {
            state.showSideBar = action.payload
        },
        setCurrentOrderStatus: (state, action) => {
            state.currentOrderStatus = action.payload
        },
        setContentBlog: (state, action) => {
            state.blogContent = {
                ...state.blogContent,
                ...action.payload
            }
            // localStorage.setItem('BLOG_CONTENT', JSON.stringify(state.blogContent))
        },
        getCurrentContent: (state, action) => {
            state.blogContent = JSON.parse(localStorage.getItem('BLOG_CONTENT'))
            let currentContent = JSON.parse(localStorage.getItem('BLOG_CONTENT'))

            if (currentContent) {
                state.blogContent = currentContent
            }
        },
        setUploadBlog: (state, action) => {
            state.uploadBlog = action.payload
        },
        setBlogSubCategory: (state, action) => {
            state.blogSubCategory = action.payload
        },
        setBlogId: (state, action) => {
            state.blogId = action.payload
        },
        clearBlogContent: (state, action) => {
            state.blogContent = null
        }
    }
})

export const { setShowSideBar, setContentBlog, setUploadBlog, getCurrentContent, setBlogSubCategory, setBlogId, clearBlogContent,
    setCurrentOrderStatus, setConfirmPackage, setReportData, setReportFilterMonth, setReportFilterYear,
    setReportFilterDateFrom, setReportFilterDateTo, setReportTypee } = managementSlice.actions;
export default managementSlice.reducer;
