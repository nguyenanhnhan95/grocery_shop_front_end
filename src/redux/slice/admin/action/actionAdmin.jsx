import {createSlice } from "@reduxjs/toolkit";




export const actionAdminSlice = createSlice({
    name: "actionAdmin",
    initialState: {
        onClickAction: null,
        close: false,
    },
    reducers: {

        actionSave: (state, action) => {
            state.close = action.payload.close;
        },
        onClickSaveAction: (state, action) => {
            state.onClickAction = action.payload;
        },
    }
})
export const { actionSave,onClickSaveAction} = actionAdminSlice.actions