import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Benefit {
    // your benefit properties
}

interface BenefitState {
    benefit: Benefit | null;
    isLoading: boolean;
    error: any;
}

const benefitName = 'benefits';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: BenefitState = {
    benefit: null,
    isLoading: false,
    error: null
};

const getBenefits = createAsyncThunk(`${benefitName}/getBenefits`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/benefits`);
});

const getBenefitById = createAsyncThunk(`${benefitName}/getBenefitById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/benefits/${id}`);
});

const createBenefit = createAsyncThunk(`${benefitName}/createBenefit`, async (benefit: Benefit) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/benefits`, benefit);
});

const deleteBenefit = createAsyncThunk(`${benefitName}/deleteBenefit`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/benefits/${id}`);
});

const updateBenefit = createAsyncThunk(`${benefitName}/updateBenefit`, async (benefit: Benefit) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/benefits`, benefit);
});

const benefitSlice = createSlice({
    name: benefitName,
    initialState,
    reducers: {
        clearBenefits: (state) => {
            state.benefit = null;
            localStorage.removeItem('sm-benefits');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBenefitById.fulfilled, (state, action) => {
                state.benefit = action.payload;
                state.error = null;
            })
            .addCase(getBenefitById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(createBenefit.fulfilled, (state, action) => {
                const benefit = action.payload;
                state.benefit = benefit;
                state.error = null;
            })
            .addCase(createBenefit.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteBenefit.fulfilled, (state, action) => {
                state.benefit = action.payload;
                state.error = null;
            })
            .addCase(deleteBenefit.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateBenefit.fulfilled, (state, action) => {
                state.benefit = action.payload;
            })
            .addCase(updateBenefit.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearBenefits } = benefitSlice.actions;
export const benefitActions = {
    getBenefits,
    getBenefitById,
    createBenefit,
    deleteBenefit,
    updateBenefit,
};
export const benefitReducer = benefitSlice.reducer;
