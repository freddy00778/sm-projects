// Slice and Thunks for Projects API

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Decision {
}

interface DecisionState {
    decision: Decision | null;
    decisions: Decision[] | null;
    isLoading: boolean;
    error: any;
}

// create slice
const name = 'decisions';
const initialProjectState = createDecisionInitialState();
const decisionReducers = createDecisionReducers();
const extraDecisionActions = createDecisionExtraActions();
const extraDecisionReducers = createDecisionExtraReducers();
const decisionSlice = createSlice({
    name,
    initialState: initialProjectState,
    reducers: decisionReducers,
    extraReducers: extraDecisionReducers
});

// exports
export const decisionActions = { ...decisionSlice.actions, ...extraDecisionActions };
export const decisionReducer = decisionSlice.reducer;

// implementation
function createDecisionInitialState(): DecisionState {
    return {
        decision: {},
        decisions: [],
        isLoading: false,
        error: null
    }
}

function createDecisionReducers() {
    return {
        clearDecisions,
    };

    function clearDecisions(state: DecisionState) {
        state.decisions = null;
    }
}

function createDecisionExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {

        getAll: createAsyncThunk(
            `${name}/getAll`,
            async ({ project_id }: { project_id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/decisions?project_id=${project_id}`);
            }
        ),

        getById: createAsyncThunk(
            `${name}/getById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/decisions/${id}`);
            }
        ),
        createDecision: createAsyncThunk(
            `${name}/createDecision`,
            async (project: Decision) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/decisions`, project);
            }
        ),
        deleteDecision: createAsyncThunk(
            `${name}/deleteDecision`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/decisions/${id}`);
            }
        ),
        updateProject: createAsyncThunk(
            `${name}/update`,
            async (project: Decision) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/decisions`, project);
            }
        )
    };
}

function createDecisionExtraReducers() {
    return {

        [extraDecisionActions.getAll.fulfilled.toString()]: (state: DecisionState, action: PayloadAction<Decision[]>) => {
            state.decisions = action.payload
            state.error = null;
        },

        [extraDecisionActions.getAll.pending.toString()]: (state: DecisionState, action: PayloadAction<Decision>) => {
            state.isLoading = true
            state.error = null;
        },

        [extraDecisionActions.getAll.rejected.toString()]: (state: DecisionState, action: PayloadAction<Decision>) => {
            state.error = action.payload;
        },


        [extraDecisionActions.getById.fulfilled.toString()]: (state: DecisionState, action: PayloadAction<Decision>) => {
            state.decision = action.payload; // assuming a single project gets stored
            state.error = null;
        },
        [extraDecisionActions.getById.rejected.toString()]: (state: DecisionState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraDecisionActions.getById.fulfilled.toString()]: (state: DecisionState, action: PayloadAction<Decision>) => {
            state.decision = action.payload; // assuming a single project gets stored
            state.error = null;
        },
        [extraDecisionActions.getById.rejected.toString()]: (state: DecisionState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraDecisionActions.createDecision.fulfilled.toString()]: (state: DecisionState, action: PayloadAction<Decision>) => {
            // Assuming the backend returns the created project
            const project = action.payload;
            if (state.decision) {
                state.decision = project;
            } else {
                state.decision = project;
            }
            state.error = null;
        },
        [extraDecisionActions.createDecision.rejected.toString()]: (state: DecisionState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraDecisionActions.deleteDecision.fulfilled.toString()]: (state: DecisionState, action: PayloadAction<{id: string}>) => {
            if (state.decision) {
                state.decision = action.payload
            }
            state.error = null;
        },
        [extraDecisionActions.deleteDecision.rejected.toString()]: (state: DecisionState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraDecisionActions.updateProject.fulfilled.toString()]: (state: DecisionState, action: PayloadAction<Decision>) => {
            state.decision = action.payload;
        },
        [extraDecisionActions.updateProject.rejected.toString()]: (state: DecisionState, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    };
}


