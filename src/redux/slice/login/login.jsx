import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CONST_LOGIN, FETCH_LOGIN, LINK_USER } from "../../../utils/commonConstants";
export const loginFormAuth = createAsyncThunk('auth/login',
    async (account, { rejectWithValue }) => {
        try {
            console.log(account)
            const response = await axios.post(LINK_USER.authLogin, account,{withCredentials:true});
            if(response?.data?.code== 200){
                return response.data;
            }     
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const loginFormSlice = createSlice({
    name: "loginForm",
    initialState: {
        accessToken: null,
        error: null,
        status:FETCH_LOGIN.FETCH_LOGIN_INITIAL
    },
    extraReducers: (builder) => {
        builder.addCase(loginFormAuth.pending, (state) => {
            state.accessToken = null;
            state.error = null;
            state.status=FETCH_LOGIN.FETCH_LOGIN_LOADING;
        })
            .addCase(loginFormAuth.fulfilled, (state, action) => {
                state.status=FETCH_LOGIN.FETCH_LOGIN_SUCCESS;
                console.log(state.accessToken)
                state.accessToken = action?.payload?.result;
                state.error = null;
                console.log(state.accessToken)
            })
            .addCase(loginFormAuth.rejected, (state, action) => {
                state.status=FETCH_LOGIN.FETCH_LOGIN_FAIL;
                state.accessToken = null;
                state.error = action?.payload?.result;
            })
    }
})