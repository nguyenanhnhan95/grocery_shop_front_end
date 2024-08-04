import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createActionURL, createHeader, handleAssignData } from "../../../utils/commonUtils";
import { FETCH_SHOP_PROMOTION } from "../../action/admin/shop/promotion";



export const findAllPromotion = createAsyncThunk('shop-promotion',
    async (_, { rejectWithValue }) => {
        try {
            console.log(createActionURL('shop-promotion').instant())
            const response = await axios.get(createActionURL('shop-promotion').instant(),createHeader());
            return response.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchPromotionSlice = createSlice({
    name: "fetchPromotionSlice",
    initialState: {
        promotions: [],
        statusPromotion: FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_INITIAL,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(findAllPromotion.pending, (state) => {
            state.statusPromotion = FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_LOADING;
            state.promotions = [];

        })
            .addCase(findAllPromotion.fulfilled, (state, action) => {
                state.statusPromotion = FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_SUCCESS;
                state.promotions = handleAssignData(action).updateArrayList();
                
            })
            .addCase(findAllPromotion.rejected, (state, action) => {
                state.statusPromotion = FETCH_SHOP_PROMOTION.FETCH_SHOP_PROMOTION_FAIL;
                state.promotions = [];
                state.error = action?.error;
            })
    }
})