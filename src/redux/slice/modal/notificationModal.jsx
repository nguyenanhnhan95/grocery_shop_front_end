import { createSlice } from "@reduxjs/toolkit"
import { CLOSE, SHOW } from "../../../utils/commonConstants";

export const notificationModalSlice = createSlice({
  name: 'notificationModalSlice',
  initialState: {
    show: false,
    message: ""
  },
  reducers: {
    handleNotificationModal: (state, action) => {
      console.log(action)
      switch (action?.payload?.type) {
        case SHOW:
          state.show = true;
          state.message = action.payload.message
          break;
        case CLOSE:
          state.show = false;
          break;
        default:
          return;
      }
    }
  },
})
export const { handleNotificationModal } = notificationModalSlice.actions
