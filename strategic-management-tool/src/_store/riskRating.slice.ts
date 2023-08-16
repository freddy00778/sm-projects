import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface RiskRatingSlice {
    id: string;
    // Add other properties specific to RiskRating here.
}

interface RiskRatingState {
    riskRating: RiskRatingSlice | null;
    riskRatings: RiskRatingSlice[] | null;
    isLoading: boolean;
    error: any;
}

const riskRatingName = 'riskRatings'; // Updated name
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: RiskRatingState = {
    riskRating: null,
    riskRatings: null,
    isLoading: false,
    error: null
};

const getRiskRatings = createAsyncThunk(`${riskRatingName}/getRiskRatings`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-ratings`); // Updated endpoint
});

const getRiskRatingByKeyId = createAsyncThunk(`${riskRatingName}/getRiskRatingByKeyId`, async ({ id, project_id }: { id: string, project_id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-ratings?id=${id}&project_id=${project_id}`); // Updated endpoint
});

const getRiskRatingById = createAsyncThunk(`${riskRatingName}/getRiskRatingById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/risk-ratings/${id}`); // Updated endpoint
});

const createRiskRating = createAsyncThunk(`${riskRatingName}/createRiskRating`, async (riskRating: RiskRatingSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/risk-ratings`, riskRating); // Updated endpoint
});

const deleteRiskRating = createAsyncThunk(`${riskRatingName}/deleteRiskRating`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/risk-ratings/${id}`); // Updated endpoint
});

const updateRiskRating = createAsyncThunk(`${riskRatingName}/updateRiskRating`, async (riskRating: RiskRatingSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/risk-ratings/${riskRating.id}`, riskRating); // Updated endpoint
});

const riskRatingSlice = createSlice({
    name: riskRatingName,
    initialState,
    reducers: {
        clearRiskRatings: (state) => {
            state.riskRatings = null;
            localStorage.removeItem('sm-riskRatings');
        },
    },
    extraReducers: (builder) => {
        builder


            .addCase(getRiskRatings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRiskRatings.fulfilled, (state, action: PayloadAction<RiskRatingSlice[]>) => {
                state.riskRatings = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getRiskRatings.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })


            .addCase(getRiskRatingByKeyId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRiskRatingByKeyId.fulfilled, (state, action: PayloadAction<RiskRatingSlice[]>) => {
                state.riskRatings = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getRiskRatingByKeyId.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(createRiskRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRiskRating.fulfilled, (state, action: PayloadAction<RiskRatingSlice[]>) => {
                state.riskRating = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createRiskRating.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    },
});

export const { clearRiskRatings } = riskRatingSlice.actions;
export const riskRatingActions = {
    getRiskRatings,
    getRiskRatingById,
    getRiskRatingByKeyId,
    createRiskRating,
    deleteRiskRating,
    updateRiskRating,
};
export const riskRatingReducer = riskRatingSlice.reducer;
