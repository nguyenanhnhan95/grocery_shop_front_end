import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONST_LOGIN, DOMAIN_SERVER } from "../../../utils/commonConstants";
import { FETCH_REFRESH_TOKEN } from "../../action/auth/authentication";
import axios from "axios";


export const fetchRefreshToken = createAsyncThunk('auth/refresh-token', async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.get(`${DOMAIN_SERVER}/auth/refresh-token`,{withCredentials:true});
        return response.data;
    } catch (error) {
        console.log(rejectWithValue(error).payload.response.status)
        return rejectWithValue(error)
    }
})
export const refreshTokenSlice = createSlice({
    name: 'refreshToken',
    initialState: {
        error: null,
        status: FETCH_REFRESH_TOKEN.FETCH_REFRESH_TOKEN_INITIAL
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefreshToken.pending, (state, action) => {
                state.status = FETCH_REFRESH_TOKEN.FETCH_REFRESH_TOKEN_LOADING;
                state.error = null;
            })
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                state.status = FETCH_REFRESH_TOKEN.FETCH_REFRESH_TOKEN_SUCCESS;
                state.error = null;
            })
            .addCase(fetchRefreshToken.rejected, (state, action) => {
                state.status = FETCH_REFRESH_TOKEN.FETCH_REFRESH_TOKEN_FAIL;
                state.error = action?.error;
            })
    }
})
export const { updateProfile } = refreshTokenSlice.actions