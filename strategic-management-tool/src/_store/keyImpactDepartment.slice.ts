// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface KeyImpactDepartmentSlice {
    id: string;
    // Add other properties specific to KeyImpactDepartment here.
}

interface KeyImpactDepartmentState {
    keyImpactDepartment: KeyImpactDepartmentSlice | null;
    keyImpactDepartments: KeyImpactDepartmentSlice[] | null;
    isLoading: boolean;
    error: any;
}

const keyImpactDepartmentName = 'keyImpactDepartments';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: KeyImpactDepartmentState = {
    keyImpactDepartment: null,
    keyImpactDepartments: null,
    isLoading: false,
    error: null
};

const getKeyImpactDepartments = createAsyncThunk(`${keyImpactDepartmentName}/getKeyImpactDepartments`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-impact-departments`);
})

const getKeyImpactDepartmentByKeyChangeId = createAsyncThunk(`${keyImpactDepartmentName}/getKeyImpactDepartmentByKeyImpactId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-impact-departments?id=${id}`);
})

const getKeyImpactDepartmentById = createAsyncThunk(`${keyImpactDepartmentName}/getKeyImpactDepartmentById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-impact-departments/${id}`);
});

const createKeyImpactDepartment = createAsyncThunk(`${keyImpactDepartmentName}/createKeyImpactDepartment`, async (keyImpactDepartment: KeyImpactDepartmentSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/key-impact-departments`, keyImpactDepartment);
});

const deleteKeyImpactDepartment = createAsyncThunk(`${keyImpactDepartmentName}/deleteKeyImpactDepartment`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/key-impact-departments/${id}`);
});

const updateKeyImpactDepartment = createAsyncThunk(`${keyImpactDepartmentName}/updateKeyImpactDepartment`, async (keyImpactDepartment: KeyImpactDepartmentSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/key-impact-departments`, keyImpactDepartment);
});

const keyImpactDepartmentSlice = createSlice({
    name: keyImpactDepartmentName,
    initialState,
    reducers: {
        clearKeyImpactDepartments: (state) => {
            state.keyImpactDepartments = null;
            localStorage.removeItem('sm-keyImpactDepartments');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKeyImpactDepartmentByKeyChangeId.fulfilled, (state, action) => {
                state.keyImpactDepartments = action.payload;
                state.error = null;
                state.isLoading = false;
            })

            .addCase(getKeyImpactDepartmentByKeyChangeId.pending, (state, action) => {
                state.keyImpactDepartments = action.payload;
                state.error = null;
                state.isLoading = true;
            })

            .addCase(getKeyImpactDepartmentByKeyChangeId.rejected, (state, action) => {
                state.keyImpactDepartments = action.payload;
                state.error = null;
                state.isLoading = false;
            })
    },
});

export const { clearKeyImpactDepartments } = keyImpactDepartmentSlice.actions;
export const keyImpactDepartmentActions = {
    getKeyImpactDepartments,
    getKeyImpactDepartmentById,
    getKeyImpactDepartmentByKeyChangeId,
    createKeyImpactDepartment,
    deleteKeyImpactDepartment,
    updateKeyImpactDepartment,
};
export const keyImpactDepartmentReducer = keyImpactDepartmentSlice.reducer;
