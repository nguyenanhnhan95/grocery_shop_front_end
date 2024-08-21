import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LINK_USER, SCREEN_THEME, SCREEN_THEME_MODE } from "../../../utils/commonConstants";
import { handleArrayVariables } from "../../../utils/commonUtils";
import { FETCH_PROFILE } from "../../action/person/person";
import { handleAuthenticateException } from "../../../handler/handlerException"
export const Local_Storage_Profile = "STORE_PROFILE";
const initialState = {
    authenticate: JSON.parse(localStorage.getItem(Local_Storage_Profile))?.authenticate || false,
    profile: JSON.parse(localStorage.getItem(Local_Storage_Profile))?.profile || null,
    screenMode: JSON.parse(localStorage.getItem(Local_Storage_Profile))?.screenMode || SCREEN_THEME_MODE.SCREEN_LIGHT,
    status: FETCH_PROFILE.FETCH_PROFILE_INITIAL,
    roles: [],
    srcAvatar: JSON.parse(localStorage.getItem(Local_Storage_Profile))?.srcAvatar || null,
    errorAvatar: null,
    error: null,
}
export const fetchProfileSlice = createAsyncThunk('fetchProfile', async (_, {  rejectWithValue }) => {
    try {
        const response = await axios.get(LINK_USER.getProfile, { withCredentials: true });
        if (response.data?.code === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(rejectWithValue(error)?.payload?.response?.data?.status)
        // handleAuthenticateException({ code: rejectWithValue(error)?.payload?.response?.data?.status, dispatch: dispatch })
        return rejectWithValue(error);
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.profile = action?.payload.profile;
            state.screenMode = action?.payload?.profile?.screenTheme
        },
        updateSrcAvatar: (state, action) => {
            if (JSON.parse(localStorage.getItem(Local_Storage_Profile))?.srcAvatar?.srcAvatar === null && state.profile?.avatar !== null) {
                if (action.payload?.error !== null) {
                    const temp = { ...JSON.parse(localStorage.getItem(Local_Storage_Profile)), srcAvatar: action.payload.srcAvatar }
                    localStorage.setItem(Local_Storage_Profile, JSON.stringify(temp))
                }

                state.srcAvatar = action.payload.srcAvatar;
                state.errorAvatar = action.payload.error;
            }
        },
        logoutProfile: (state) => {
            state.authenticate = false,
                state.profile = null,
                state.screenMode = localStorage.getItem(SCREEN_THEME) || SCREEN_THEME_MODE.SCREEN_LIGHT,
                state.status = FETCH_PROFILE.FETCH_PROFILE_INITIAL,
                state.roles = [],
                state.srcAvatar = null,
                state.errorAvatar = null,
                state.error = null,
                localStorage.removeItem(Local_Storage_Profile);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileSlice.pending, (state, action) => {
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
                if (action.payload.result.screenTheme) {
                    state.screenMode = action.payload.result.screenTheme;
                    localStorage.setItem(SCREEN_THEME, action.payload.result.screenTheme)
                }
                localStorage.setItem(Local_Storage_Profile, JSON.stringify({
                    profile: { name: state.profile.name, avatar: state.profile.avatar },
                    screenMode: state.screenMode,
                    authenticate: true,
                    srcAvatar: null
                }));
            })
            .addCase(fetchProfileSlice.rejected, (state, action) => {
                console.log(action)
                if (action?.payload?.status !== 4008) {
                    localStorage.removeItem(Local_Storage_Profile)
                    state.authenticate = false;
                    state.profile = null;
                }
                state.loading = false;
                state.status = FETCH_PROFILE.FETCH_PROFILE_FAIL;
                state.error = action.payload;
            })
    }
})
export const { updateProfile, updateSrcAvatar, logoutProfile } = profileSlice.actions