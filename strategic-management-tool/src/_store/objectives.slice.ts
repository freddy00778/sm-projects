import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Objective {
    // your objective properties
}

interface ObjectiveState {
    objective: Objective | null;
    objectives: Objective[] | null;
    isLoading: boolean;
    error: any;
}

const objectiveName = 'objectives';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: ObjectiveState = {
    objective: null,
    objectives: null,
    isLoading: false,
    error: null
};

const getObjectives = createAsyncThunk(`${objectiveName}/getObjectives`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/objectives`);
});


const getObjectiveById = createAsyncThunk(`${objectiveName}/getObjectiveById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/objectives/${id}`);
});

const getObjectiveByKeyChangeId = createAsyncThunk(`${objectiveName}/getObjectiveByKeyChangeId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/objectives/${id}?type=keychange`);
});

const createObjective = createAsyncThunk(`${objectiveName}/createObjective`, async (objective: Objective) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/objectives`, objective);
});

const deleteObjective = createAsyncThunk(`${objectiveName}/deleteObjective`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/objectives/${id}`);
});

const updateObjective = createAsyncThunk(`${objectiveName}/updateObjective`, async (objective: Objective) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/objectives`, objective);
});

const objectiveSlice = createSlice({
    name: objectiveName,
    initialState,
    reducers: {
        clearObjectives: (state) => {
            state.objectives = null;
            // localStorage.removeItem('sm-objectives');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getObjectiveById.fulfilled, (state, action) => {
                state.objective = action.payload;
                state.error = null;
                state.isLoading = false

            })
            .addCase(getObjectiveById.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getObjectiveById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getObjectiveByKeyChangeId.fulfilled, (state, action) => {
                state.objective = action.payload;
                state.error = null;
                state.isLoading = false
            })

            .addCase(getObjectiveByKeyChangeId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getObjectiveByKeyChangeId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(createObjective.fulfilled, (state, action) => {
                const objective = action.payload;
                state.objective = objective;
                state.error = null;
                state.isLoading = false
            })
            .addCase(createObjective.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(createObjective.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(deleteObjective.fulfilled, (state, action) => {
                state.objective = action.payload;
                state.error = null;
                state.isLoading = false

            })
            .addCase(deleteObjective.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(deleteObjective.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(updateObjective.fulfilled, (state, action) => {
                state.objective = action.payload;
                state.isLoading = false
            })
            .addCase(updateObjective.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false

            })
            .addCase(updateObjective.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            });
    },
});

export const { clearObjectives } = objectiveSlice.actions;
export const objectiveActions = {
    getObjectives,
    getObjectiveById,
    getObjectiveByKeyChangeId,
    createObjective,
    deleteObjective,
    updateObjective,
};
export const objectiveReducer = objectiveSlice.reducer;
