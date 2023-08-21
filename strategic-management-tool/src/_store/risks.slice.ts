// Slice and Thunks for Risks API

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Risk {
    id: string
}

interface RiskState {
    risk: Risk | null;
    risks: Risk[] | null;
    isLoading: boolean;
    error: any;
    riskEditOpened: boolean
    riskViewOpened: boolean
    riskDeleteOpened: boolean
    riskAction: any
}

// create slice
const name = 'risks';
const initialRiskState  = createRiskInitialState();
const riskReducers      = createRiskReducers();
const extraRiskActions  = createRiskExtraActions();
const extraRiskReducers = createRiskExtraReducers();
const riskSlice         = createSlice({
    name,
    initialState: initialRiskState,
    reducers: riskReducers,
    extraReducers: extraRiskReducers
});

// exports
export const riskActions = { ...riskSlice.actions, ...extraRiskActions };
export const riskReducer = riskSlice.reducer;

// implementation
function createRiskInitialState(): RiskState {
    return {
        risk: null,
        risks: null,
        isLoading: false,
        error: null,
        riskEditOpened: false,
        riskViewOpened: false,
        riskDeleteOpened: false,
        riskAction: {}
    }
}

function createRiskReducers() {
    return {
        clearRisks,
        openRiskEditModal,
        openRiskViewModal,
        openRiskDeleteModal,
        setClickedRiskAction
    };

    function clearRisks(state: RiskState) {
        state.risks = null;
    }

    function openRiskEditModal(state: RiskState, value  ) {
        state.riskEditOpened = value;
    }

    function openRiskViewModal(state: RiskState, value) {
        state.riskViewOpened = value;
    }

    function openRiskDeleteModal(state: RiskState, value) {
        state.riskDeleteOpened = value;
    }

    function setClickedRiskAction(state: RiskState, value){
        state.riskAction = value;
    }
}

function createRiskExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getAll: createAsyncThunk(
            `${name}/getAll`,
            async ({ key_change_id, project_id }: { key_change_id: string, project_id }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/risks?key_change_id=${key_change_id}&project_id=${project_id}`);
            }
        ),

        getById: createAsyncThunk(
            `${name}/getById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/risks/${id}`);
            }
        ),

        createRisk: createAsyncThunk(
            `${name}/createRisk`,
            async (risk: Risk) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/risks`, risk);
            }
        ),

        deleteRisk: createAsyncThunk(
            `${name}/deleteRisk`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/risks/${id}`);
            }
        ),

        updateRisk: createAsyncThunk(
            `${name}/update`,
            async (risk: Risk) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/risks`, risk);
            }
        )
    };
}

function createRiskExtraReducers() {
    return {
        [extraRiskActions.getAll.fulfilled.toString()]: (state: RiskState, action: PayloadAction<Risk[]>) => {
            state.risks = action.payload
            state.error = null;
            state.isLoading = false
        },

        [extraRiskActions.getAll.pending.toString()]: (state: RiskState, action: PayloadAction<Risk>) => {
            state.isLoading = true
            state.error = null;
            state.isLoading = true

        },

        [extraRiskActions.getAll.rejected.toString()]: (state: RiskState, action: PayloadAction<Risk>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraRiskActions.getById.fulfilled.toString()]: (state: RiskState, action: PayloadAction<Risk>) => {
            state.risk = action.payload;
            state.error = null;
            state.isLoading = false
        },

        [extraRiskActions.getById.rejected.toString()]: (state: RiskState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false

        },

        [extraRiskActions.createRisk.fulfilled.toString()]: (state: RiskState, action: PayloadAction<Risk>) => {
            const risk = action.payload;
            if (state.risk) {
                state.risk = risk;
            } else {
                state.risk = risk;
            }
            state.error = null;
            state.isLoading = false

        },

        [extraRiskActions.createRisk.pending.toString()]: (state: RiskState, action: PayloadAction<Risk>) => {
            const risk = action.payload;
            if (state.risk) {
                state.risk = risk;
            } else {
                state.risk = risk;
            }
            state.error = null;
            state.isLoading = true

        },

        [extraRiskActions.createRisk.rejected.toString()]: (state: RiskState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraRiskActions.deleteRisk.fulfilled.toString()]: (state: RiskState, action: PayloadAction<{id: string}>) => {
            if (state.risk && state.risk.id === action.payload.id) {
                state.risk = null
            }
            state.error = null;
            state.isLoading = true

        },

        [extraRiskActions.deleteRisk.rejected.toString()]: (state: RiskState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false

        },

        [extraRiskActions.deleteRisk.pending.toString()]: (state: RiskState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },


        [extraRiskActions.updateRisk.fulfilled.toString()]: (state: RiskState, action: PayloadAction<Risk>) => {
            if (state.risk && state.risk.id === action.payload.id) {
                state.risk = action.payload;
            }
            state.error = null;
            state.isLoading = false

        },

        [extraRiskActions.updateRisk.rejected.toString()]: (state: RiskState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false

        },

        [extraRiskActions.updateRisk.pending.toString()]: (state: RiskState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true

        }
    };
}
