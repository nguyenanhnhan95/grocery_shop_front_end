import axios from "axios";
import { toastSuccess } from "../../../../config/toast";
import { REQUEST_PARAM_ID, REQUEST_PARAM_QUERY } from "../../../../utils/commonConstants";
import { createActionURL, createHeader } from "../../../../utils/commonUtils";
import { FETCH_BY_ID_VARIATION, FETCH_EDIT_VARIATION, FETCH_RESULT_VARIATION, FETCH_SAVE_VARIATION, FETCH_VARIATIONS } from "../../../action/admin/productManage/variation";

const path=createActionURL("variation").instant()
export const saveVariation = createAsyncThunk('/admin/save-variation',
    async (data , { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(path, data, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            if (error?.response?.status === 4008) {
                handleServiceRefreshToken({ handleService: saveVariation, dispatch, args: data  })
            }
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const editVariation = createAsyncThunk('/admin/edit-variation',
    async (id, data , { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${path}${REQUEST_PARAM_ID}${id}`, data, createHeader());
            toastSuccess(response.data.message)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getByIdVariation = createAsyncThunk('/admin/by-id-variation',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${path}${REQUEST_PARAM_ID}${id}`, createHeader());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const deleteByIdVariation = createAsyncThunk('/admin/delete-by-id-variation',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.delete(`${http}${REQUEST_PARAM_ID}${id}`, createHeader());
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
export const searchVariation = createAsyncThunk('/admin/search-variation',
    async (data, { rejectWithValue }) => {
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
export const fetchVariationSlice = createSlice({
    name: "fetchVariationSlice",
    initialState: {
        resultVariation: { result: [], total: 0 },
        queryParameter: {
            size: 5,
            page: 0,
            criterias: {
                name: ""
            }
        },
        statusResultVariation:FETCH_RESULT_VARIATION.FETCH_RESULT_VARIATION_INITIAL,
        variations: [],
        statusVariations:FETCH_VARIATIONS.FETCH_VARIATIONS_INITIAL,
        variation:null,
        statusVariation:FETCH_BY_ID_VARIATION.FETCH_BY_ID_VARIATION_INITIAL,
        statusEditVariation:FETCH_EDIT_VARIATION.FETCH_EDIT_VARIATION_INITIAL,
        statusSaveVariation:FETCH_SAVE_VARIATION.FETCH_SAVE_VARIATION_INITIAL
        
    },
    reducers: {
        selectSize: (state, action) => {
            state.queryParameter.size = action.payload;
        },
        choicePage: (state, action) => {
            state.queryParameter.page = action.payload;
        },
        onClickSaveAction: (state, action) => {
            state.onClickAction = action.payload;
        },
        createQueryParameter: (state, action) => {
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
export const { actionSave, selectSize, choicePage, createQueryParameter, createDataEdit,
    onClickSaveAction, setActionModel, resetPage } = actionAdminSlice.actions