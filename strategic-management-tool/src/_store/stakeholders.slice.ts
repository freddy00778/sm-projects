import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Stakeholder {
    // your stakeholder properties
}

interface StakeholderState {
    stakeholder: Stakeholder | null;
    stakeholders: Stakeholder[] | null;
    isLoading: boolean;
    error: any;
}

const stakeholderName = 'stakeholders';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: StakeholderState = {
    stakeholder: null,
    stakeholders: null,
    isLoading: false,
    error: null
};

const getStakeholders = createAsyncThunk(`${stakeholderName}/getStakeholders`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/stakeholders`);
});

const getStakeholdersByKeyChangeId = createAsyncThunk(`${stakeholderName}/getStakeholdersByKeyChangeId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/stakeholders/?id=${id}`);
});

const getStakeholderById = createAsyncThunk(`${stakeholderName}/getStakeholderById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/stakeholders/${id}`);
});



const createStakeholder = createAsyncThunk(`${stakeholderName}/createStakeholder`, async (stakeholder: Stakeholder) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/stakeholders`, stakeholder);
});

const deleteStakeholder = createAsyncThunk(`${stakeholderName}/deleteStakeholder`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/stakeholders/${id}`);
});

const updateStakeholder = createAsyncThunk(`${stakeholderName}/updateStakeholder`, async (stakeholder: Stakeholder) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/stakeholders`, stakeholder);
});

const stakeholderSlice = createSlice({
    name: stakeholderName,
    initialState,
    reducers: {
        clearStakeholders: (state) => {
            state.stakeholder = null;
            localStorage.removeItem('sm-stakeholders');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getStakeholders.fulfilled, (state, action) => {
                state.stakeholders = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getStakeholders.pending, (state, action) => {
                state.stakeholders = action.payload;
                state.error = null;
                state.isLoading = true
            })
            .addCase(getStakeholders.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getStakeholderById.fulfilled, (state, action) => {
                state.stakeholder = action.payload;
                state.error = null;
                state.isLoading = false

            })
            .addCase(getStakeholderById.pending, (state, action) => {
                state.stakeholder = action.payload;
                state.error = null;
                state.isLoading = true
            })
            .addCase(getStakeholderById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })


            .addCase(getStakeholdersByKeyChangeId.fulfilled, (state, action) => {
                state.stakeholders = action.payload;
                state.error = null;
                state.isLoading = false

            })
            .addCase(getStakeholdersByKeyChangeId.pending, (state, action) => {
                state.stakeholders = action.payload;
                state.error = null;
                state.isLoading = true
            })
            .addCase(getStakeholdersByKeyChangeId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })


            .addCase(createStakeholder.fulfilled, (state, action) => {
                const stakeholder = action.payload
                state.stakeholder = stakeholder
                state.error = null
                state.isLoading = false
            })

            .addCase(createStakeholder.pending, (state, action) => {
                state.stakeholder = action.payload;
                state.error = null;
                state.isLoading = true
            })

            .addCase(createStakeholder.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })

            .addCase(deleteStakeholder.fulfilled, (state, action) => {
                state.stakeholder = action.payload;
                state.error = null
                state.isLoading = false
            })

            .addCase(deleteStakeholder.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(deleteStakeholder.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })
            .addCase(updateStakeholder.fulfilled, (state, action) => {
                state.stakeholder = action.payload
                state.isLoading = false
            })

            .addCase(updateStakeholder.pending, (state, action) => {
                state.stakeholder = action.payload
                state.isLoading = true
            })

            .addCase(updateStakeholder.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            });
    },
});

export const { clearStakeholders } = stakeholderSlice.actions;
export const stakeholderActions = {
    getStakeholders,
    getStakeholderById,
    getStakeholdersByKeyChangeId,
    createStakeholder,
    deleteStakeholder,
    updateStakeholder,
};
export const stakeholderReducer = stakeholderSlice.reducer;
