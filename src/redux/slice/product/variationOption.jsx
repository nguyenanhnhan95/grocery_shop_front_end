import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createActionURL, createHeader, handleAssignData } from "../../../utils/commonUtils";
import { FETCH_VARIATION_OPTIONS } from "../../action/admin/productManage/variationOption";


export const findAllVariationOption = createAsyncThunk('product-variation-option',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(createActionURL('products-variation-option').instant(), createHeader());
            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchVariationOptionSlice = createSlice({
    name: "fetchVariationOptionSlice",
    initialState: {
        variationOptions: [],
        statusVariationOptions: FETCH_VARIATION_OPTIONS.FETCH_VARIATION_OPTIONS_INITIAL,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(findAllVariationOption.pending, (state) => {
            state.statusVariationOptions = FETCH_VARIATION_OPTIONS.FETCH_VARIATION_OPTIONS_LOADING;
            state.variationOptions = [];

        })
            .addCase(findAllVariationOption.fulfilled, (state, action) => {
                state.statusVariationOptions = FETCH_VARIATION_OPTIONS.FETCH_VARIATION_OPTIONS_SUCCESS;
                state.variationOptions = handleAssignData(action).updateArrayList();

            })
            .addCase(findAllVariationOption.rejected, (state, action) => {
                state.statusVariationOptions = FETCH_VARIATION_OPTIONS.FETCH_VARIATION_OPTIONS_FAIL;
                state.variationOptions = [];
                state.error = action?.error;
            })
    }
})