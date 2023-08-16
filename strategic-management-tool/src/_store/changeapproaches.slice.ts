import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface ChangeApproach {
    // your changeApproach properties
}

interface ChangeApproachState {
    changeApproach: ChangeApproach | null;
    changeApproaches: ChangeApproach[] | null;
    isLoading: boolean;
    error: any;
}

const changeApproachName = 'changeApproaches';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: ChangeApproachState = {
    changeApproach: null,
    changeApproaches: null,
    isLoading: false,
    error: null
};

const getChangeApproaches = createAsyncThunk(`${changeApproachName}/getChangeApproaches`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/change-approaches`);
});

const getChangeApproachById = createAsyncThunk(`${changeApproachName}/getChangeApproachById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/change-approaches/${id}`);
});

const getChangeApproachByProjectId = createAsyncThunk(`${changeApproachName}/getChangeApproachByProjectId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/change-approaches/${id}?type=project_id`);
});

const createChangeApproach = createAsyncThunk(`${changeApproachName}/createChangeApproach`, async (changeApproach: ChangeApproach) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/change-approaches`, changeApproach);
});

const deleteChangeApproach = createAsyncThunk(`${changeApproachName}/deleteChangeApproach`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/change-approaches/${id}`);
});

const updateChangeApproach = createAsyncThunk(`${changeApproachName}/updateChangeApproach`, async (changeApproach: ChangeApproach) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/change-approaches`, changeApproach);
});

const changeApproachSlice = createSlice({
    name: changeApproachName,
    initialState,
    reducers: {
        clearChangeApproaches: (state) => {
            state.changeApproach = null;
            localStorage.removeItem('sm-changeApproaches');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChangeApproachById.fulfilled, (state, action) => {
                state.changeApproach = action.payload;
                state.error = null;
                state.isLoading = false

            })
            .addCase(getChangeApproachById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false

            })

            .addCase(getChangeApproachById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getChangeApproachByProjectId.fulfilled, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getChangeApproachByProjectId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false

            })

            .addCase(getChangeApproachByProjectId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(createChangeApproach.fulfilled, (state, action) => {
                const changeApproach = action.payload;
                state.changeApproach = changeApproach;
                state.error = null;
                state.isLoading = false

            })
            .addCase(createChangeApproach.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(createChangeApproach.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(deleteChangeApproach.fulfilled, (state, action) => {
                state.changeApproach = action.payload;
                state.error = null;
            })
            .addCase(deleteChangeApproach.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateChangeApproach.fulfilled, (state, action) => {
                state.changeApproach = action.payload;
            })
            .addCase(updateChangeApproach.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearChangeApproaches } = changeApproachSlice.actions;
export const changeApproachActions = {
    getChangeApproaches,
    getChangeApproachById,
    getChangeApproachByProjectId,
    createChangeApproach,
    deleteChangeApproach,
    updateChangeApproach,
};
export const changeApproachReducer = changeApproachSlice.reducer;
