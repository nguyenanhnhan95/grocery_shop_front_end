import { createSlice } from "@reduxjs/toolkit";

export const loadingFetchSlice = createSlice({
    name: 'fetchLoading',
    initialState: {
        loadingTasks: ['None'],
        errorTasks: [],
    },
    reducers: {
        addLoadingTask: (state,action) => {
            state.loadingTasks = state.loadingTasks.filter(task => task !== 'None' );
            state.loadingTasks.push(action.payload);
        },
        removeLoadingTask: (state,action) => {
            state.loadingTasks = state.loadingTasks.filter(task => task !== action.payload );
        },
        addErrorTask: (state,action) => {
            state.errorTasks.push(action.payload);
        }
    }
})
export const { addLoadingTask, removeLoadingTask, addErrorTask } = loadingFetchSlice.actions;
export default loadingFetchSlice.reducer;