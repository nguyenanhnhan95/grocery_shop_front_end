import { createSlice } from "@reduxjs/toolkit"

export const overPlayMenuMainSlice = createSlice({
    name: 'overPlayMenuMain',
    initialState: {
      open:false,
      clickMenuAdminRef:null
    },
    reducers: {
      onClickHandleOverPlay:(state,action)=>{
        state.open=action?.payload
      },
      onClickMenuAdminRef:(state,action)=>{
        state.clickMenuAdminRef=action?.payload
      }
    },
  })
export const { onClickHandleOverPlay, onClickMenuAdminRef} = overPlayMenuMainSlice.actions

export default overPlayMenuMainSlice
  