import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface ObjectiveBenefit {
    // your benefit properties
}

interface ObjectiveBenefitState {
    benefit: ObjectiveBenefit | null;
    objectiveBenefits: ObjectiveBenefit[] | null;
    isLoading: boolean;
    error: any;
}

const benefitName = 'objectiveBenefits';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: ObjectiveBenefitState = {
    benefit: null,
    objectiveBenefits: null,
    isLoading: false,
    error: null
};

const getObjectiveBenefits = createAsyncThunk(`${benefitName}/getObjectiveBenefits`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/objective-benefits`);
})

const getObjectiveBenefitsByKeyId = createAsyncThunk(`${benefitName}/getObjectiveBenefitsByKeyId`, async ({id}) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/objective-benefits?id=${id}`);
});

const getObjectiveBenefitById = createAsyncThunk(`${benefitName}/getObjectiveBenefitById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/objectiveBenefits/${id}`);
});

const createObjectiveBenefit = createAsyncThunk(`${benefitName}/createObjectiveBenefit`, async (benefit: ObjectiveBenefit) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/objectiveBenefits`, benefit);
});

const deleteObjectiveBenefit = createAsyncThunk(`${benefitName}/deleteObjectiveBenefit`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/objectiveBenefits/${id}`);
});

const updateObjectiveBenefit = createAsyncThunk(`${benefitName}/updateObjectiveBenefit`, async (benefit: ObjectiveBenefit) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/objectiveBenefits`, benefit);
});

const objectiveBenefitSlice = createSlice({
    name: benefitName,
    initialState,
    reducers: {
        clearObjectiveBenefits: (state) => {
            state.benefit = null;
            localStorage.removeItem('sm-objectiveBenefits');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getObjectiveBenefits.fulfilled, (state, action) => {
                state.objectiveBenefits = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getObjectiveBenefits.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getObjectiveBenefits.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true

            })

            .addCase(getObjectiveBenefitsByKeyId.fulfilled, (state, action) => {
                state.objectiveBenefits = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getObjectiveBenefitsByKeyId.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(getObjectiveBenefitsByKeyId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getObjectiveBenefitById.fulfilled, (state, action) => {
                state.benefit = action.payload;
                state.error = null;
            })
            .addCase(getObjectiveBenefitById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(createObjectiveBenefit.fulfilled, (state, action) => {
                const benefit = action.payload;
                state.benefit = benefit;
                state.error = null;
            })
            .addCase(createObjectiveBenefit.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteObjectiveBenefit.fulfilled, (state, action) => {
                state.benefit = action.payload;
                state.error = null;
            })
            .addCase(deleteObjectiveBenefit.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateObjectiveBenefit.fulfilled, (state, action) => {
                state.benefit = action.payload;
            })
            .addCase(updateObjectiveBenefit.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearObjectiveBenefits } = objectiveBenefitSlice.actions;
export const objectiveBenefitActions = {
    getObjectiveBenefits,
    getObjectiveBenefitById,
    getObjectiveBenefitsByKeyId,
    createObjectiveBenefit,
    deleteObjectiveBenefit,
    updateObjectiveBenefit,
};
export const objectiveBenefitReducer = objectiveBenefitSlice.reducer;
