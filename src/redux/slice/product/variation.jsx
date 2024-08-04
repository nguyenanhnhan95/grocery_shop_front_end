import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createActionURL, createHeader, handleAssignData } from "../../../utils/commonUtils";
import { FETCH_PRODUCT_VARIATION } from "../../action/admin/productManage/variation";


export const findAllVariation = createAsyncThunk('product-variation',
    async (_, { rejectWithValue }) => {
        try {
            console.log(createActionURL('products-variation').instant())
            const response = await axios.get(createActionURL('products-variation').instant(),createHeader());
            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchVariationSlice = createSlice({
    name: "fetchVariationSlice",
    initialState: {
        variations: [],
        statusVariation: FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_INITIAL,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(findAllVariation.pending, (state) => {
            state.statusVariation = FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_LOADING;
            state.variations = [];

        })
            .addCase(findAllVariation.fulfilled, (state, action) => {
                state.statusVariation = FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_SUCCESS;
                state.variations = handleAssignData(action).updateArrayList();
                
            })
            .addCase(findAllVariation.rejected, (state, action) => {
                state.statusVariation = FETCH_PRODUCT_VARIATION.FETCH_PRODUCT_VARIATION_FAIL;
                state.variations = [];
                state.error = action?.error;
            })
    }
})