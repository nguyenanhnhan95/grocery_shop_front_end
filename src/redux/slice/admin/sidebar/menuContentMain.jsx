import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FETCH_BY_PATH_MENU_ADMIN, FETCH_MENUS_ADMIN, LINK_MENU, REQUEST_PARAM_PATH } from "../../../../utils/commonConstants";
import axios from "axios";
import { createHeader, handleAssignData, handleExceptionView, loadMenuParentActive } from "../../../../utils/commonUtils";

export const getSidebarMenusAdmin = createAsyncThunk('getSidebarMenus',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(LINK_MENU.adminSide, createHeader());
      return response.data
    } catch (error) {
      console.log(error.response.status)
      handleExceptionView({ code: error.response.status })
    } 
  }
)
export const getMenuByPathAdmin = createAsyncThunk('/menu/admin-side/path',
  async (path, { dispatch }) => {
    try {
      console.log(`${LINK_MENU.adminSidePath}${REQUEST_PARAM_PATH}${path}`)
      const response = await axios.get(`${LINK_MENU.adminSidePath}${REQUEST_PARAM_PATH}${path}`, createHeader());
      return response.data
    } catch (error) {
      console.log(error.response.status)
      handleExceptionView({ code: error.response.status })
    } 
  }
)
export const menuContentMainSlice = createSlice({
  name: 'menuContentMainSlice',
  initialState: {
    menu: null,
    error: null,
    menuParentActive:null,
    statusMenus: FETCH_MENUS_ADMIN.FETCH_MENUS_ADMIN_INITIAL,
    statusMenu:FETCH_BY_PATH_MENU_ADMIN.FETCH_BY_PATH_MENU_ADMIN_INITIAL,
    menus: []
  },
  reducers: {
    transferMenuToContentMain: (state, action) => {
      console.log(action)
      state.menu = action?.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSidebarMenusAdmin.pending, (state) => {
      state.statusMenus = FETCH_MENUS_ADMIN.FETCH_MENUS_ADMIN_LOADING;
      state.error = null;
    })
      .addCase(getSidebarMenusAdmin.rejected, (state, action) => {
        state.statusMenus = FETCH_MENUS_ADMIN.FETCH_MENUS_ADMIN_FAIL;
        state.error = action.payload;
      })
      .addCase(getSidebarMenusAdmin.fulfilled, (state, action) => {
        state.error = null;
        state.statusMenus = FETCH_MENUS_ADMIN.FETCH_MENUS_ADMIN_SUCCESS;
        state.menus = handleAssignData(action).updateArrayList();
        console.log(loadMenuParentActive(state.menus))
        state.menuParentActive=loadMenuParentActive(state.menus)
      })
    builder.addCase(getMenuByPathAdmin.pending, (state) => {
      state.statusMenu = FETCH_BY_PATH_MENU_ADMIN.FETCH_BY_PATH_MENU_ADMIN_LOADING;
      state.error = null;
    })
      .addCase(getMenuByPathAdmin.rejected, (state, action) => {
        state.statusMenu = FETCH_BY_PATH_MENU_ADMIN.FETCH_BY_PATH_MENU_ADMIN_FAIL;
        state.error = action.payload;
      })
      .addCase(getMenuByPathAdmin.fulfilled, (state, action) => {
        state.error = null;
        state.statusMenu = FETCH_BY_PATH_MENU_ADMIN.FETCH_BY_PATH_MENU_ADMIN_SUCCESS;
        state.menu = handleAssignData(action).updateObject();
      })
  }
})
export const { transferMenuToContentMain } = menuContentMainSlice.actions

export default menuContentMainSlice;