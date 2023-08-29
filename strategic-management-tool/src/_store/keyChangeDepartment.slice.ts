
// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface KeyChangeDepartmentSlice {
    id: string;
    // Add other properties specific to KeyChangeDepartment here.
}

interface KeyChangeDepartmentState {
    keyChangeDepartment: KeyChangeDepartmentSlice | null;
    keyChangeDepartments: KeyChangeDepartmentSlice[] | null;
    isLoading: boolean;
    error: any;
}

const keyChangeDepartmentName = 'keyChangeDepartments';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: KeyChangeDepartmentState = {
    keyChangeDepartment: null,
    keyChangeDepartments: null,
    isLoading: false,
    error: null
};

const getKeyChangeDepartments = createAsyncThunk(`${keyChangeDepartmentName}/getKeyChangeDepartments`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-change-departments`);
})

const getKeyChangeDepartmentByKeyChangeId = createAsyncThunk(`${keyChangeDepartmentName}/getKeyChangeDepartmentByKeyChangeId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-change-departments?id=${id}`);
})


const getKeyChangeDepartmentById = createAsyncThunk(`${keyChangeDepartmentName}/getKeyChangeDepartmentById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-change-departments/${id}`);
});

const createKeyChangeDepartment = createAsyncThunk(`${keyChangeDepartmentName}/createKeyChangeDepartment`, async (keyChangeDepartment: KeyChangeDepartmentSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/key-change-departments`, keyChangeDepartment);
});

const deleteKeyChangeDepartment = createAsyncThunk(`${keyChangeDepartmentName}/deleteKeyChangeDepartment`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/key-change-departments/${id}`);
});

const updateKeyChangeDepartment = createAsyncThunk(`${keyChangeDepartmentName}/updateKeyChangeDepartment`, async (keyChangeDepartment: KeyChangeDepartmentSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/key-change-departments`, keyChangeDepartment);
});

const keyChangeDepartmentSlice = createSlice({
    name: keyChangeDepartmentName,
    initialState,
    reducers: {
        clearKeyChangeDepartments: (state) => {
            state.keyChangeDepartments = null;
            localStorage.removeItem('sm-keyChangeDepartments');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKeyChangeDepartmentByKeyChangeId.fulfilled, (state, action) => {
                state.keyChangeDepartments = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyChangeDepartmentByKeyChangeId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getKeyChangeDepartmentByKeyChangeId.pending, (state) => {
                state.isLoading = true;
            })


            .addCase(getKeyChangeDepartments.fulfilled, (state, action) => {
                state.keyChangeDepartments = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyChangeDepartments.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getKeyChangeDepartments.pending, (state) => {
                state.isLoading = true;
            })


            .addCase(getKeyChangeDepartmentById.fulfilled, (state, action) => {
                state.keyChangeDepartment = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyChangeDepartmentById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(getKeyChangeDepartmentById.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(createKeyChangeDepartment.fulfilled, (state, action) => {
                state.keyChangeDepartment = action.payload;
                state.error = null;
            })
            .addCase(createKeyChangeDepartment.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteKeyChangeDepartment.fulfilled, (state, action) => {
                state.keyChangeDepartment = action.payload;
                state.error = null;
            })
            .addCase(deleteKeyChangeDepartment.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(updateKeyChangeDepartment.fulfilled, (state, action) => {
                state.keyChangeDepartment = action.payload;
                state.error = null;
            })
            .addCase(updateKeyChangeDepartment.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearKeyChangeDepartments } = keyChangeDepartmentSlice.actions;
export const keyChangeDepartmentActions = {
    getKeyChangeDepartments,
    getKeyChangeDepartmentById,
    getKeyChangeDepartmentByKeyChangeId,
    createKeyChangeDepartment,
    deleteKeyChangeDepartment,
    updateKeyChangeDepartment,
};
export const keyChangeDepartmentReducer = keyChangeDepartmentSlice.reducer;
