// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface CaseForChange {
    id:string
}

interface CaseForChangeState {
    caseForChange: CaseForChange | null;
    isLoading: boolean;
    error: any;
}

const caseForChangeName = 'caseForChanges';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: CaseForChangeState = {
    caseForChange: null,
    isLoading: false,
    error: null
};

const getCaseForChanges = createAsyncThunk(`${caseForChangeName}/getCaseForChanges`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/case-for-changes`);
});

const getCaseForChangeById = createAsyncThunk(`${caseForChangeName}/getCaseForChangeById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/case-for-changes/${id}`);
});

const getCaseForChangeByProjectId = createAsyncThunk(`${caseForChangeName}/getCaseForChangeByProjectId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/case-for-changes/${id}?type=project_id`);
});


const createCaseForChange = createAsyncThunk(`${caseForChangeName}/createCaseForChange`, async (caseForChange: CaseForChange) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/case-for-changes`, caseForChange);
});

const deleteCaseForChange = createAsyncThunk(`${caseForChangeName}/deleteCaseForChange`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/case-for-changes/${id}`);
});

const updateCaseForChange = createAsyncThunk(`${caseForChangeName}/updateCaseForChange`, async (caseForChange: CaseForChange) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/case-for-changes`, caseForChange);
});

const caseForChangeSlice = createSlice({
    name: caseForChangeName,
    initialState,
    reducers: {
        clearCaseForChanges: (state) => {
            state.caseForChange = null;
            localStorage.removeItem('sm-caseForChanges');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getCaseForChanges.fulfilled, (state, action) => {
                state.caseForChange = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getCaseForChanges.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false

            })

            .addCase(getCaseForChanges.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getCaseForChangeById.fulfilled, (state, action) => {
                state.caseForChange = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getCaseForChangeById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getCaseForChangeById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getCaseForChangeByProjectId.fulfilled, (state, action) => {
                state.caseForChange = action.payload;
                state.error = null;
                state.isLoading = false

            })
            .addCase(getCaseForChangeByProjectId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getCaseForChangeByProjectId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(createCaseForChange.fulfilled, (state, action) => {
                const caseForChange = action.payload;
                state.caseForChange = caseForChange;
                state.error = null;
                state.isLoading = false

            })
            .addCase(createCaseForChange.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(createCaseForChange.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(deleteCaseForChange.fulfilled, (state, action) => {
                state.caseForChange = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(deleteCaseForChange.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(deleteCaseForChange.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(updateCaseForChange.fulfilled, (state, action) => {
                state.caseForChange = action.payload;
                state.isLoading = false
            })
            .addCase(updateCaseForChange.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })
            .addCase(updateCaseForChange.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true

            });
    },
});

export const { clearCaseForChanges } = caseForChangeSlice.actions;
export const caseForChangeActions = {
    getCaseForChanges,
    getCaseForChangeById,
    getCaseForChangeByProjectId,
    createCaseForChange,
    deleteCaseForChange,
    updateCaseForChange,
};
export const caseForChangeReducer = caseForChangeSlice.reducer;
