// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface RiskObstacleSlice {
    id: string;
    // Add other properties specific to RiskObstacle here.
}

interface RiskObstacleState {
    riskObstacle: RiskObstacleSlice | null;
    riskObstacles: RiskObstacleSlice[] | null;
    isLoading: boolean;
    error: any;
}

const riskObstacleName = 'riskObstacles';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: RiskObstacleState = {
    riskObstacle: null,
    riskObstacles: null,
    isLoading: false,
    error: null
};

const getRiskObstacles = createAsyncThunk(`${riskObstacleName}/getRiskObstacles`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-obstacles`);
});

const getRiskObstacleByKeyId = createAsyncThunk(`${riskObstacleName}/getRiskObstacleByKeyId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-obstacles?id=${id}`);
});

const getRiskObstacleById = createAsyncThunk(`${riskObstacleName}/getRiskObstacleById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-obstacles/${id}`);
});

const createRiskObstacle = createAsyncThunk(`${riskObstacleName}/createRiskObstacle`, async (riskObstacle: RiskObstacleSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/risk-obstacles`, riskObstacle);
});

const deleteRiskObstacle = createAsyncThunk(`${riskObstacleName}/deleteRiskObstacle`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/risk-obstacles/${id}`);
});

const updateRiskObstacle = createAsyncThunk(`${riskObstacleName}/updateRiskObstacle`, async (riskObstacle: RiskObstacleSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/risk-obstacles/${riskObstacle.id}`, riskObstacle);
});

const riskObstacleSlice = createSlice({
    name: riskObstacleName,
    initialState,
    reducers: {
        clearRiskObstacles: (state) => {
            state.riskObstacles = null;
            localStorage.removeItem('sm-riskObstacles');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRiskObstacles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRiskObstacles.fulfilled, (state, action: PayloadAction<RiskObstacleSlice[]>) => {
                state.riskObstacles = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getRiskObstacles.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(getRiskObstacleByKeyId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRiskObstacleByKeyId.fulfilled, (state, action: PayloadAction<RiskObstacleSlice[]>) => {
                state.riskObstacles = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getRiskObstacleByKeyId.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(createRiskObstacle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRiskObstacle.fulfilled, (state, action: PayloadAction<RiskObstacleSlice[]>) => {
                state.riskObstacle = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createRiskObstacle.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })


    },
});

export const { clearRiskObstacles } = riskObstacleSlice.actions;
export const riskObstacleActions = {
    getRiskObstacles,
    getRiskObstacleById,
    getRiskObstacleByKeyId,
    createRiskObstacle,
    deleteRiskObstacle,
    updateRiskObstacle,
};
export const riskObstacleReducer = riskObstacleSlice.reducer;
