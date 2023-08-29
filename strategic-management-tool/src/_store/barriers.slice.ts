// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Barrier {
    id: string
    // your barrier properties
}

interface BarrierState {
    barrier: Barrier | null;
    barriers: Barrier[] | null;
    isLoading: boolean;
    error: any;
}

const barrierName = 'barriers';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: BarrierState = {
    barrier: null,
    barriers: null,
    isLoading: false,
    error: null
};

const getBarriers = createAsyncThunk(`${barrierName}/getBarriers`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/barriers`);
});

const getBarrierById = createAsyncThunk(`${barrierName}/getBarrierById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/barriers/${id}`);
});

const createBarrier = createAsyncThunk(`${barrierName}/createBarrier`, async (barrier: Barrier) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/barriers`, barrier);
});

const deleteBarrier = createAsyncThunk(`${barrierName}/deleteBarrier`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/barriers/${id}`);
});

const updateBarrier = createAsyncThunk(`${barrierName}/updateBarrier`, async (barrier: Barrier) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/barriers`, barrier);
});

const barrierSlice = createSlice({
    name: barrierName,
    initialState,
    reducers: {
        clearBarriers: (state) => {
            state.barriers = null;
            localStorage.removeItem('sm-barriers');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBarriers.fulfilled, (state, action) => {
                state.barriers = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getBarriers.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })
            .addCase(getBarriers.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })
            .addCase(getBarrierById.fulfilled, (state, action) => {
                state.barrier = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getBarrierById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getBarrierById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })
            .addCase(createBarrier.fulfilled, (state, action) => {
                const barrier = action.payload;
                state.barrier = barrier;
                state.error = null;
                state.isLoading = false
            })

            .addCase(createBarrier.pending, (state, action) => {
                const barrier = action.payload;
                state.barrier = barrier;
                state.isLoading = true
                state.error = null;
            })

            .addCase(createBarrier.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })
            .addCase(deleteBarrier.fulfilled, (state, action) => {
                state.barrier = action.payload;
                state.error = null;
            })
            .addCase(deleteBarrier.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateBarrier.fulfilled, (state, action) => {
                state.barrier = action.payload;
            })
            .addCase(updateBarrier.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearBarriers } = barrierSlice.actions;
export const barrierActions = {
    getBarriers,
    getBarrierById,
    createBarrier,
    deleteBarrier,
    updateBarrier,
};
export const barrierReducer = barrierSlice.reducer;
