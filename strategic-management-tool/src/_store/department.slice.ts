// Slice and Thunks for Departments API
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Department {
    // your department properties
}

interface DepartmentState {
    department: Department | null;
    departments: Department[] | null;
    isLoading: boolean;
    error: any;
}

// create slice
const departmentName = 'departments';
const initialDepartmentState = createDepartmentInitialState();
const departmentReducers = createDepartmentReducers();
const extraDepartmentActions = createDepartmentExtraActions();
const extraDepartmentReducers = createDepartmentExtraReducers();
const departmentSlice = createSlice({
    name: departmentName,
    initialState: initialDepartmentState,
    reducers: departmentReducers,
    extraReducers: extraDepartmentReducers
});

// exports
export const departmentActions = { ...departmentSlice.actions, ...extraDepartmentActions };
export const departmentReducer = departmentSlice.reducer;

// implementation
function createDepartmentInitialState(): DepartmentState {
    return {
        department: {},
        departments: null,
        isLoading: false,
        error: null
    }
}

function createDepartmentReducers() {
    return {
        clearDepartments,
    };

    function clearDepartments(state: DepartmentState) {
        state.department = null;
        localStorage.removeItem('sm-departments');
    }
}

function createDepartmentExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getDepartments: createAsyncThunk(
            `${departmentName}/getDepartments`,
            async () => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/departments`);
            }
        ),

        getDepartmentById: createAsyncThunk(
            `${departmentName}/getDepartmentById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/departments/${id}`);
            }
        ),
        createDepartment: createAsyncThunk(
            `${departmentName}/createDepartment`,
            async (department: Department) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/departments`, department);
            }
        ),
        deleteDepartment: createAsyncThunk(
            `${departmentName}/deleteDepartment`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/departments/${id}`);
            }
        ),
        updateDepartment: createAsyncThunk(
            `${departmentName}/updateDepartment`,
            async (department: Department) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/departments`, department);
            }
        )
    };
}

function createDepartmentExtraReducers() {
    return {

        [extraDepartmentActions.getDepartments.fulfilled.toString()]: (state: DepartmentState, action: PayloadAction<Department[]>) => {
            state.departments = action.payload;
            state.error = null;
            state.isLoading = false
        },
        [extraDepartmentActions.getDepartments.rejected.toString()]: (state: DepartmentState, action: PayloadAction<any>) => {
            state.error = action.payload
            state.isLoading = false
        },

        [extraDepartmentActions.getDepartments.pending.toString()]: (state: DepartmentState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },

        [extraDepartmentActions.getDepartmentById.fulfilled.toString()]: (state: DepartmentState, action: PayloadAction<Department>) => {
            state.department = action.payload;
            state.error = null;
        },
        [extraDepartmentActions.getDepartmentById.rejected.toString()]: (state: DepartmentState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraDepartmentActions.createDepartment.fulfilled.toString()]: (state: DepartmentState, action: PayloadAction<Department>) => {
            const department = action.payload;
            if (state.department) {
                state.department = department;
            } else {
                state.department = department;
            }
            state.error = null;
        },
        [extraDepartmentActions.createDepartment.rejected.toString()]: (state: DepartmentState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraDepartmentActions.deleteDepartment.fulfilled.toString()]: (state: DepartmentState, action: PayloadAction<{ id: string }>) => {
            if (state.department) {
                state.department = action.payload;
            }
            state.error = null;
        },
        [extraDepartmentActions.deleteDepartment.rejected.toString()]: (state: DepartmentState, action: PayloadAction<any>) =>{
            state.error = action.payload;
        },
        [extraDepartmentActions.updateDepartment.fulfilled.toString()]: (state: DepartmentState, action: PayloadAction<Department>) => {
            state.department = action.payload;
        },
        [extraDepartmentActions.updateDepartment.rejected.toString()]: (state: DepartmentState, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    };
}
