import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface HighLevelPlan {
    // your HighLevelPlan properties
}

interface HighLevelPlanState {
    highLevelPlan: HighLevelPlan | null;
    highLevelPlans: HighLevelPlan[] | null;
    isLoading: boolean;
    error: any;
}

// create slice
const highLevelPlanName = 'highLevelPlans';
const initialHighLevelPlanState = createHighLevelPlanInitialState();
const highLevelPlanReducers = createHighLevelPlanReducers();
const extraHighLevelPlanActions = createHighLevelPlanExtraActions();
const extraHighLevelPlanReducers = createHighLevelPlanExtraReducers();
const highLevelPlanSlice = createSlice({
    name: highLevelPlanName,
    initialState: initialHighLevelPlanState,
    reducers: highLevelPlanReducers,
    extraReducers: extraHighLevelPlanReducers
});

// exports
export const highLevelPlanActions = { ...highLevelPlanSlice.actions, ...extraHighLevelPlanActions };
export const highLevelPlanReducer = highLevelPlanSlice.reducer;

// implementation
function createHighLevelPlanInitialState(): HighLevelPlanState {
    return {
        highLevelPlan: null,
        highLevelPlans: null,
        isLoading: false,
        error: null
    }
}

function createHighLevelPlanReducers() {
    return {
        clearHighLevelPlans,
    };

    function clearHighLevelPlans(state: HighLevelPlanState) {
        state.highLevelPlan = null;
        localStorage.removeItem('sm-highLevelPlans');
    }
}

function createHighLevelPlanExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getHighLevelPlans: createAsyncThunk(
            `${highLevelPlanName}/getHighLevelPlans`,
            async () => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/plans`);
            }
        ),

        getHighLevelPlansByProjectId: createAsyncThunk(
            `${highLevelPlanName}/getHighLevelPlansByProjectId`,
            async ({id}: {id: string}) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/plans?project_id=${id}`);
            }
        ),


        getHighLevelPlanById: createAsyncThunk(
            `${highLevelPlanName}/getHighLevelPlanById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/plans/${id}`);
            }
        ),
        createHighLevelPlan: createAsyncThunk(
            `${highLevelPlanName}/createHighLevelPlan`,
            async (highLevelPlan: HighLevelPlan) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/plans`, highLevelPlan);
            }
        ),
        deleteHighLevelPlan: createAsyncThunk(
            `${highLevelPlanName}/deleteHighLevelPlan`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/plans/${id}`);
            }
        ),
        updateHighLevelPlan: createAsyncThunk(
            `${highLevelPlanName}/updateHighLevelPlan`,
            async (highLevelPlan: HighLevelPlan) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/plans`, highLevelPlan);
            }
        )
    };
}

function createHighLevelPlanExtraReducers() {
    return {
        [extraHighLevelPlanActions.getHighLevelPlans.fulfilled.toString()]: (state: HighLevelPlanState, action: PayloadAction<HighLevelPlan[]>) => {
            state.highLevelPlans = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        [extraHighLevelPlanActions.getHighLevelPlans.rejected.toString()]: (state: HighLevelPlanState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [extraHighLevelPlanActions.getHighLevelPlans.pending.toString()]: (state: HighLevelPlanState) => {
            state.isLoading = true;
        },

        [extraHighLevelPlanActions.getHighLevelPlansByProjectId.fulfilled.toString()]: (state: HighLevelPlanState, action: PayloadAction<HighLevelPlan[]>) => {
            state.highLevelPlans = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        [extraHighLevelPlanActions.getHighLevelPlansByProjectId.rejected.toString()]: (state: HighLevelPlanState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        [extraHighLevelPlanActions.getHighLevelPlansByProjectId.pending.toString()]: (state: HighLevelPlanState) => {
            state.isLoading = true;
        },

        [extraHighLevelPlanActions.getHighLevelPlanById.fulfilled.toString()]: (state: HighLevelPlanState, action: PayloadAction<HighLevelPlan>) => {
            state.highLevelPlan = action.payload;
            state.error = null;
        },
        [extraHighLevelPlanActions.getHighLevelPlanById.rejected.toString()]: (state: HighLevelPlanState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },

        [extraHighLevelPlanActions.createHighLevelPlan.fulfilled.toString()]: (state: HighLevelPlanState, action: PayloadAction<HighLevelPlan>) => {
            state.highLevelPlan = action.payload;
            state.error = null;
        },
        [extraHighLevelPlanActions.createHighLevelPlan.rejected.toString()]: (state: HighLevelPlanState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },

        [extraHighLevelPlanActions.deleteHighLevelPlan.fulfilled.toString()]: (state: HighLevelPlanState, action: PayloadAction<{ id: string }>) => {
            state.highLevelPlan = null;
            state.error = null;
        },
        [extraHighLevelPlanActions.deleteHighLevelPlan.rejected.toString()]: (state: HighLevelPlanState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },

        [extraHighLevelPlanActions.updateHighLevelPlan.fulfilled.toString()]: (state: HighLevelPlanState, action: PayloadAction<HighLevelPlan>) => {
            state.highLevelPlan = action.payload;
        },
        [extraHighLevelPlanActions.updateHighLevelPlan.rejected.toString()]: (state: HighLevelPlanState, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    };
}
