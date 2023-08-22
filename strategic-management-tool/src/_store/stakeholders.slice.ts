import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Stakeholder {
    // your stakeholder properties
}

interface StakeholderState {
    departments: any
    stakeholder: Stakeholder | null;
    stakeholders: Stakeholder[] | null;
    affectedStakeholders: any;
    isLoading: boolean;
    error: any;
}

const stakeholderName = 'stakeholders';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: StakeholderState = {
    departments: null,
    stakeholder: null,
    stakeholders: null,
    affectedStakeholders: null,
    isLoading: false,
    error: null
};

const getStakeholders = createAsyncThunk(`${stakeholderName}/getStakeholders`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/stakeholders`);
});

const getAffectedStakeholders = createAsyncThunk(`${stakeholderName}/getAffectedStakeholders`, async ({key_change_id}) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/affected-stakeholders?id=${key_change_id}`);
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

const addDepartments = createAsyncThunk(`${stakeholderName}/addDepartments`, async (stakeholder: Stakeholder) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/stakeholders/change-drivers/department`, stakeholder);
});

const addAffectedStakeholder = createAsyncThunk(`${stakeholderName}/addAffectedStakeholder`, async (stakeholder: Stakeholder) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/stakeholders/affected/data`, stakeholder);
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


            .addCase(getAffectedStakeholders.fulfilled, (state, action) => {
                state.affectedStakeholders = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getAffectedStakeholders.pending, (state, action) => {
                state.affectedStakeholders = action.payload;
                state.error = null;
                state.isLoading = true
            })
            .addCase(getAffectedStakeholders.rejected, (state, action) => {
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


            .addCase(addAffectedStakeholder.fulfilled, (state, action) => {
                // const stakeholder = action.payload
                // state.stakeholder = stakeholder
                state.error = null
                state.isLoading = false
            })

            .addCase(addAffectedStakeholder.pending, (state, action) => {
                // state.stakeholder = action.payload;
                state.error = null;
                state.isLoading = true
            })

            .addCase(addAffectedStakeholder.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })

            .addCase(addDepartments.fulfilled, (state, action) => {
                const stakeholder = action.payload
                state.departments = stakeholder
                state.error = null
                state.isLoading = false
            })

            .addCase(addDepartments.pending, (state, action) => {
                state.departments = action.payload;
                state.error = null;
                state.isLoading = true
            })

            .addCase(addDepartments.rejected, (state, action) => {
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
    getAffectedStakeholders,
    getStakeholderById,
    getStakeholdersByKeyChangeId,
    createStakeholder,
    addDepartments,
    addAffectedStakeholder,
    deleteStakeholder,
    updateStakeholder,
};
export const stakeholderReducer = stakeholderSlice.reducer;
