// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface RiskLeverSlice {
    id: string;
    // Add other properties specific to RiskLever here.
}

interface RiskLeverState {
    riskLever: RiskLeverSlice | null;
    riskLevers: RiskLeverSlice[] | null;
    isLoading: boolean;
    error: any;
}

const riskLeverName = 'riskLevers'; // Updated name
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: RiskLeverState = {
    riskLever: null,
    riskLevers: null,
    isLoading: false,
    error: null
};

const getRiskLevers = createAsyncThunk(`${riskLeverName}/getRiskLevers`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-levers`); // Updated endpoint
});

const getRiskLeverByKeyId = createAsyncThunk(`${riskLeverName}/getRiskLeverByKeyId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-levers?id=${id}`); // Updated endpoint
});

const getRiskLeverById = createAsyncThunk(`${riskLeverName}/getRiskLeverById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-levers/${id}`); // Updated endpoint
});

const createRiskLever = createAsyncThunk(`${riskLeverName}/createRiskLever`, async (riskLever: RiskLeverSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/risk-levers`, riskLever); // Updated endpoint
});

const deleteRiskLever = createAsyncThunk(`${riskLeverName}/deleteRiskLever`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/risk-levers/${id}`); // Updated endpoint
});

const updateRiskLever = createAsyncThunk(`${riskLeverName}/updateRiskLever`, async (riskLever: RiskLeverSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/risk-levers/${riskLever.id}`, riskLever); // Updated endpoint
});

const riskLeverSlice = createSlice({
    name: riskLeverName,
    initialState,
    reducers: {
        clearRiskLevers: (state) => {
            state.riskLevers = null;
            localStorage.removeItem('sm-riskLevers');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRiskLevers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRiskLevers.fulfilled, (state, action: PayloadAction<RiskLeverSlice[]>) => {
                state.riskLevers = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getRiskLevers.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(createRiskLever.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRiskLever.fulfilled, (state, action: PayloadAction<RiskLeverSlice[]>) => {
                state.riskLever = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createRiskLever.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

    },
});

export const { clearRiskLevers } = riskLeverSlice.actions;
export const riskLeverActions = {
    getRiskLevers,
    getRiskLeverById,
    getRiskLeverByKeyId,
    createRiskLever,
    deleteRiskLever,
    updateRiskLever,
};
export const riskLeverReducer = riskLeverSlice.reducer;
