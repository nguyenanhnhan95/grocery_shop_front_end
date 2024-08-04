import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_USER, SCREEN_THEME, SCREEN_THEME_MODE } from "../../../utils/commonConstants";
import { createHeader, handleArrayVariables } from "../../../utils/commonUtils";
import { FETCH_PROFILE } from "../../action/person/person";
import {handleProfileException} from "../../../handler/handlerException"

const initialState = {
    authenticate: false,
    profile: null,
    screenMode:localStorage.getItem(SCREEN_THEME) !==null ? localStorage.getItem(SCREEN_THEME) : SCREEN_THEME_MODE.SCREEN_LIGHT,
    status: FETCH_PROFILE.FETCH_PROFILE_INITIAL,
    roles: [],
    error: null,
}
export const fetchProfileSlice = createAsyncThunk('fetchProfile', async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.get(LINK_USER.getProfile, createHeader());
        return response.data;
    } catch (error) {

        handleProfileException({ code: rejectWithValue(error)?.payload?.response?.status, dispatch: dispatch })
        return rejectWithValue(error.response.data);
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            console.log(action.payload.profile)
            state.profile = action?.payload.profile;
            state.screenMode = action?.payload?.profile?.screenTheme
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileSlice.pending, (state, action) => {
                state.authenticate = false;
                state.profile = null;
                state.status = FETCH_PROFILE.FETCH_PROFILE_LOADING;
                state.roles = [];
                state.error = null;
            })
            .addCase(fetchProfileSlice.fulfilled, (state, action) => {
                state.authenticate = true;
                state.profile = action.payload.result;
                state.roles = handleArrayVariables(action.payload.result.roles)
                state.error = null;              
                state.status = FETCH_PROFILE.FETCH_PROFILE_SUCCESS;
                if(action.payload.result.screenTheme){
                    state.screenMode = action.payload.result.screenTheme;
                    localStorage.setItem(SCREEN_THEME,action.payload.result.screenTheme)
                }
            })
            .addCase(fetchProfileSlice.rejected, (state, action) => {
                state.authenticate = false;
                state.profile = null;
                state.loading = false;
                state.status = FETCH_PROFILE.FETCH_PROFILE_FAIL;
                state.error = action.error;
            })
    }
})
export const { updateProfile } = profileSlice.actions