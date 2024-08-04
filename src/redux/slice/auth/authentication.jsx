import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONST_LOGIN, REFRESH_TOKEN_API } from "../../../utils/commonConstants";
import { FETCH_REFRESH_TOKEN } from "../../action/auth/authentication";
import axios from "axios";
import { getToken } from "../../../utils/commonUtils";

export const fetchRefreshToken = createAsyncThunk('auth/refresh-token', async (_, { dispatch, rejectWithValue }) => {
    try {
        console.log(localStorage.getItem(CONST_LOGIN.ACCESS_TOKEN))
        const response = await axios.get(`${REFRESH_TOKEN_API}${getToken()}`);
        console.log(response.data.code)
        if (response?.data?.code === 200) {
            console.log(response.data.result)
            localStorage.setItem(CONST_LOGIN.ACCESS_TOKEN, response.data.result)
        } else {
            return rejectWithValue(response.data);
        }

    } catch (error) {
        console.log(rejectWithValue(error).payload.response.status)
        handleExceptionView({ code: rejectWithValue(error).payload?.response?.status })
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