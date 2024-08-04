import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { FETCH_EMPLOYEES_FAILED, FETCH_EMPLOYEES_LOADING, FETCH_EMPLOYEES_SUCCEEDED, SEARCH_NAME_EMPLOYEE } from "../constants/employee"
import EmployeeService from "../../services/employee"
const initialState = {
    status: 'uninitialized',
    employees: [],
    error: null,
    search: {
        name: ""
    }
}
export const findAllEmployees = createAsyncThunk('employees', async ({ name }) => {
    console.log(name)
    return EmployeeService.getAll(name)
})
export const findEmployeeName = createAsyncThunk('employees/fetchEmployees')
export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        searchEmployee: (state, action) => {
            console.log(action)
            state.search = { ...state.searchEmployee, name: action.payload.name }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllEmployees.pending, (state, action) => {
                state.status = FETCH_EMPLOYEES_LOADING
            })
            .addCase(findAllEmployees.fulfilled, (state, action) => {
                state.status = FETCH_EMPLOYEES_SUCCEEDED
                state.employees = action.payload
            })
            .addCase(findAllEmployees.rejected, (state, action) => {
                state.status = FETCH_EMPLOYEES_FAILED
                state.employees = []
                state.error = action.error
            })
    }
})
export const { searchEmployee } = employeesSlice.actions