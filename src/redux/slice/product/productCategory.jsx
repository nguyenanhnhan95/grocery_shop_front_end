import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAssignData } from "../../../utils/commonUtils";
import { FETCH_PRODUCT_CATEGORIES, FETCH_PRODUCT_CATEGORY_CHILDREN, LINK_PRODUCT_CATEGORY } from "../../../utils/commonConstants";




export const findAllCategoryMenus = createAsyncThunk('product-category',
    async () => {
        try {
            const response = await axios.get(LINK_PRODUCT_CATEGORY.getMenus);
            return response.data;
        } catch (error) {

        }
    }
)
export const findChildrenCategory = createAsyncThunk('product-category/children',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get(LINK_PRODUCT_CATEGORY.getChildren);
            return response.data;
        } catch (error) {

        }
        
    }
)
export const getAllCategoryMenus = createSlice({
    name: "product-category",
    initialState: {
        list: [],
        statusList: FETCH_PRODUCT_CATEGORIES.FETCH_PRODUCT_CATEGORIES_INITIAL,
        statusChildren: FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_INITIAL,
        children: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(findAllCategoryMenus.pending, (state) => {
            state.statusList = FETCH_PRODUCT_CATEGORIES.FETCH_PRODUCT_CATEGORIES_LOADING;
            state.list = [];

        })
            .addCase(findAllCategoryMenus.fulfilled, (state, action) => {
                state.statusList = FETCH_PRODUCT_CATEGORIES.FETCH_PRODUCT_CATEGORIES_SUCCESS;
                state.list = handleAssignData(action).updateArrayList();

            })
            .addCase(findAllCategoryMenus.rejected, (state, action) => {
                state.statusList = FETCH_PRODUCT_CATEGORIES.FETCH_PRODUCT_CATEGORIES_FAIL;
                state.productCategories = [];
                state.error = action?.error;
            })
        builder.addCase(findChildrenCategory.pending, (state) => {
            state.statusChildren = FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_LOADING;
        })
            .addCase(findChildrenCategory.fulfilled, (state, action) => {
                state.statusChildren = FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_SUCCESS;
                state.children = handleAssignData(action).updateArrayList();
                console.log(action)

            })
            .addCase(findChildrenCategory.rejected, (state, action) => {
                state.statusChildren = FETCH_PRODUCT_CATEGORY_CHILDREN.FETCH_PRODUCT_CATEGORY_CHILDREN_FAIL;
                state.error = action?.error;
            })
    }
})