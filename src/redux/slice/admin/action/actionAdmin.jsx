import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createHeader, handleAssignData } from "../../../../utils/commonUtils";
import { toastError, toastSuccess } from "../../../../config/toast";
import { FETCH_BY_ID_ACTION_ADMIN, FETCH_DELETE_ID_ACTION_ADMIN, FETCH_EDIT_ACTION_ADMIN, FETCH_LIST_ACTION_ADMIN, FETCH_RELOAD_DATA, FETCH_SAVE_ACTION_ADMIN, REQUEST_PARAM_ID, REQUEST_PARAM_QUERY } from "../../../../utils/commonConstants";
import { handleServiceRefreshToken } from "../../../../handler/handlerException";

export const saveDataAdmin = createAsyncThunk('saveDataAdmin',
    async ({ http, data }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(http, data, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            if (error?.response?.status === 4008) {
                handleServiceRefreshToken({ handleService: saveDataAdmin, dispatch, args: { http, data } })
            }
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const saveFileDataAdmin = createAsyncThunk('saveFileDataAdmin',
    async ({ http, formData, data }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(http, formData, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            if (error?.response?.status === 4008) {
                handleServiceRefreshToken({ handleService: saveDataAdmin, dispatch, args: { http, formData } })
            }
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const editDataAdmin = createAsyncThunk('editDataAdmin',
    async ({ http, id, data }, { rejectWithValue, getState }) => {
        try {
            const response = await axios.patch(`${http}${REQUEST_PARAM_ID}${id}`, data, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getDataByIdAdmin = createAsyncThunk('getDataByIdAdmin',
    async ({ http, data }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${http}${REQUEST_PARAM_ID}${data}`, createHeader());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const deleteDataAdmin = createAsyncThunk('deleteDataAdmin',
    async ({ http, data }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.delete(`${http}${REQUEST_PARAM_ID}${data}`, createHeader());
            if (response.data.code === 200) {
                dispatch(resetPage())
                toastSuccess(response.data.message)
            }
            return response.data;
        } catch (error) {
            toastError(rejectWithValue(error.response.data).payload.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const searchDataAdmin = createAsyncThunk('searchDataAdmin',
    async ({ http, data }, { rejectWithValue }) => {
        try {
            const response = await axios.get(http + `${REQUEST_PARAM_QUERY}${data}`, createHeader());
            if (response.data.status === 204) {
                return [];
            } else {
                return response.data;
            }

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const actionAdminSlice = createSlice({
    name: "actionAdmin",
    initialState: {
        list: { result: [], total: 0 },
        data: [],
        onClickAction: null,
        close: false,
        httpApi: '',
        httpNavigate: '',
        itemAction: null,
        initialForm: {},
        editForm: {},
        itemSearch: [],
        nameColumn: [],
        dataActions: [],
        TBodyTable: null,
        statusList: FETCH_LIST_ACTION_ADMIN.FETCH_LIST_ACTION_ADMIN_INITIAL,
        statusSave: FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_INITIAL,
        statusEdit: FETCH_EDIT_ACTION_ADMIN.FETCH_EDIT_ACTION_ADMIN_INITIAL,
        statusById: FETCH_BY_ID_ACTION_ADMIN.FETCH_BY_ID_ACTION_ADMIN_INITIAL,
        statusDelete: FETCH_DELETE_ID_ACTION_ADMIN.FETCH_DELETE_ID_ACTION_ADMIN_INITIAL,
        loadDataTable: FETCH_RELOAD_DATA.FETCH_NEED_RELOAD_DATA,
        error: null,
        queryParameter: {
            size: 5,
            page: 0,
            criterias: {
                name: ''
            }
        }
    },
    reducers: {
        reloadDataTable: (state, action) => {
            state.loadDataTable = action.payload;
        },
        actionSave: (state, action) => {
            state.save = action.payload.save
            state.close = action.payload.close;
        },
        selectSize: (state, action) => {
            state.queryParameter.size = action.payload;
        },
        choicePage: (state, action) => {
            state.queryParameter.page = action.payload;
        },
        onClickSaveAction: (state, action) => {
            state.onClickAction = action.payload;
        },
        handleQueryParameter: (state, action) => {
            state.queryParameter = action.payload;
        },
        resetPage: (state, action) => {
            const queryParameterTemp = { ...state.queryParameter, page: 0 }
            state.queryParameter = queryParameterTemp;
        },
        createDataEdit: (state, action) => {
            state.editForm = action.payload;
        },
        setActionModel: (state, action) => {
            state.initialForm = action.payload.initialForm;
            state.editForm = action.payload.initialForm;
            state.httpApi = action.payload.httpApi;
            state.httpNavigate = action.payload.httpNavigate;
            state.itemAction = action.payload.itemAction;
            state.itemSearch = action.payload.itemSearch;
            state.queryParameter = action.payload.queryParameter;
            state.nameColumn = action.payload.nameColumn;
            state.dataActions = action.payload.dataActions;
            state.TBodyTable = action.payload.TBodyTable;
            state.list = { result: [], total: 0 };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveDataAdmin.pending, (state) => {
            state.statusSave = FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_LOADING
            state.error = null;
        })
            .addCase(saveDataAdmin.fulfilled, (state, action) => {
                state.statusSave = FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_SUCCESS
                state.data = action.payload.data;
                state.error = null;
            })
            .addCase(saveDataAdmin.rejected, (state, action) => {
                state.statusSave = FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_FAIL
                state.error = action.payload;
            })
        builder.addCase(saveFileDataAdmin.pending, (state) => {
            state.statusSave = FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_LOADING
            state.error = null;
        })
            .addCase(saveFileDataAdmin.fulfilled, (state, action) => {
                state.statusSave = FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_SUCCESS
                state.data = action.payload.data;
                state.error = null;
            })
            .addCase(saveFileDataAdmin.rejected, (state, action) => {
                state.statusSave = FETCH_SAVE_ACTION_ADMIN.FETCH_SAVE_ACTION_ADMIN_FAIL
                state.error = action.payload;
            })
        builder.addCase(editDataAdmin.pending, (state) => {
            state.statusEdit = FETCH_EDIT_ACTION_ADMIN.FETCH_EDIT_ACTION_ADMIN_LOADING
            state.error = null;
        })
            .addCase(editDataAdmin.fulfilled, (state, action) => {
                state.statusEdit = FETCH_EDIT_ACTION_ADMIN.FETCH_EDIT_ACTION_ADMIN_SUCCESS
                state.error = null;
            })
            .addCase(editDataAdmin.rejected, (state, action) => {
                state.statusEdit = FETCH_EDIT_ACTION_ADMIN.FETCH_EDIT_ACTION_ADMIN_FAIL;
                state.error = action.payload.result;
            })
        builder.addCase(deleteDataAdmin.pending, (state) => {
            state.statusDelete = FETCH_DELETE_ID_ACTION_ADMIN.FETCH_DELETE_ID_ACTION_ADMIN_LOADING;
            state.error = null;
        })
            .addCase(deleteDataAdmin.fulfilled, (state, action) => {
                state.statusDelete = FETCH_DELETE_ID_ACTION_ADMIN.FETCH_DELETE_ID_ACTION_ADMIN_SUCCESS;
                state.error = null;
            })
            .addCase(deleteDataAdmin.rejected, (state, action) => {
                state.statusDelete = FETCH_DELETE_ID_ACTION_ADMIN.FETCH_DELETE_ID_ACTION_ADMIN_FAIL;
                state.error = action.payload.result;
            })
        builder.addCase(searchDataAdmin.pending, (state) => {
            state.statusList = FETCH_LIST_ACTION_ADMIN.FETCH_LIST_ACTION_ADMIN_LOADING
            state.error = null;
        })
            .addCase(searchDataAdmin.fulfilled, (state, action) => {
                state.statusList = FETCH_LIST_ACTION_ADMIN.FETCH_LIST_ACTION_ADMIN_SUCCESS
                state.error = null;
                console.log(action)
                state.list = handleAssignData(action).updateArrayList();
                console.log(state.list)
                // if (action.payload.result !== undefined) {
                //     state.list = action.payload.result
                // } else {
                //     state.list = {
                //         result: [],
                //         total: 0
                //     }
                // }
                // const queryParameterTemp= {...state.queryParameter,page:0}
                // state.queryParameter=queryParameterTemp;

            })
            .addCase(searchDataAdmin.rejected, (state, action) => {
                state.statusList = FETCH_LIST_ACTION_ADMIN.FETCH_LIST_ACTION_ADMIN_FAIL
                state.list = {
                    result: [],
                    total: 0
                }
                // state.error = action.payload.result;

            })
        builder.addCase(getDataByIdAdmin.pending, (state) => {
            state.statusById = FETCH_BY_ID_ACTION_ADMIN.FETCH_BY_ID_ACTION_ADMIN_LOADING
            state.error = null;
        })
            .addCase(getDataByIdAdmin.fulfilled, (state, action) => {
                state.statusById = FETCH_BY_ID_ACTION_ADMIN.FETCH_BY_ID_ACTION_ADMIN_SUCCESS
                state.error = null;
                state.dataEdit = handleAssignData(action).getStatusCode()
            })
            .addCase(getDataByIdAdmin.rejected, (state, action) => {
                state.statusById = FETCH_BY_ID_ACTION_ADMIN.FETCH_BY_ID_ACTION_ADMIN_FAIL
                state.error = action.payload.result;
            })
    }
})
export const { actionSave, selectSize, choicePage, handleQueryParameter: createQueryParameter, createDataEdit,
    onClickSaveAction, setActionModel, resetPage, reloadDataTable } = actionAdminSlice.actions