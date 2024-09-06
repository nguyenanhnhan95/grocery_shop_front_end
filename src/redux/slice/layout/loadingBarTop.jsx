import { createSlice } from "@reduxjs/toolkit"
import { validation } from "../../../utils/validation";
import { CLOSE, SHOW } from "../../../utils/commonConstants";

export const loadingBarTopSlice = createSlice({
  name: 'loadingBarTopSlice',
  initialState: {
    progress: 0,
  },
  reducers: {
    chaneProgressTop: (state, action) => {
      state.progress=action.payload;
    }
  },
})
export const { chaneProgressTop } = loadingBarTopSlice.actions
