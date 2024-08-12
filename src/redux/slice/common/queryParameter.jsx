import { createSlice } from "@reduxjs/toolkit"
import { CHANGE_QUERY_PARAMETER } from "../../action/common/actionQueryParameter";

export const queryParameterSlice = createSlice({
    name: 'queryParameterSlice',
    initialState: {
        initialQueryParameter: null,
        queryParameter: {
            size: 5,
            page: 0,
            criterias: {
                
            }
        }
    },
    reducers: {
        handleQueryParameter: (state, action) => {
            switch (action.payload.type) {
                case CHANGE_QUERY_PARAMETER.CHANGE_SIZE_QUERY_PARAMETER:
                    state.queryParameter = { ...state.queryParameter, size: action.payload.data,page: state.initialQueryParameter.page }
                    break;
                case CHANGE_QUERY_PARAMETER.CHANGE_PAGE_QUERY_PARAMETER:
                    state.queryParameter = { ...state.queryParameter, page: action.payload.data }
                    break;
                case CHANGE_QUERY_PARAMETER.CHANGE_FILED_QUERY_PARAMETER:
                    state.queryParameter = { ...state.queryParameter, criterias: action.payload.data }
                    break;
                default:
                    break;
            }
        },
        createQueryParameter: (state, action) => {
            console.log(action.payload)
            state.initialQueryParameter = action?.payload;
            state.queryParameter = action?.payload;
        }
    },
})
export const { handleQueryParameter,createQueryParameter } = queryParameterSlice.actions