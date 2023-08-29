// @ts-nocheck

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface KeyImpactSlice {
    id: string;
    // Add other properties specific to KeyImpact here.
}

interface KeyImpactState {
    keyImpact: KeyImpactSlice | null;
    keyImpacts: KeyImpactSlice[] | null;
    isLoading: boolean;
    error: any;
}

const keyImpactName = 'keyImpacts';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: KeyImpactState = {
    keyImpact: null,
    keyImpacts: null,
    isLoading: false,
    error: null
};

const getKeyImpacts = createAsyncThunk(`${keyImpactName}/getKeyImpacts`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-impacts`);
});

const getKeyImpactByKeyId = createAsyncThunk(`${keyImpactName}/getKeyImpactByKeyId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-impacts?id=${id}`);
});

const getKeyImpactById = createAsyncThunk(`${keyImpactName}/getKeyImpactById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-impacts/${id}`);
});

const createKeyImpact = createAsyncThunk(`${keyImpactName}/createKeyImpact`, async (keyImpact: KeyImpactSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/key-impacts`, keyImpact);
});

const deleteKeyImpact = createAsyncThunk(`${keyImpactName}/deleteKeyImpact`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/key-impacts/${id}`);
});

const updateKeyImpact = createAsyncThunk(`${keyImpactName}/updateKeyImpact`, async (keyImpact: KeyImpactSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/key-impacts/${keyImpact.id}`, keyImpact);
});

const keyImpactSlice = createSlice({
    name: keyImpactName,
    initialState,
    reducers: {
        clearKeyImpacts: (state) => {
            state.keyImpacts = null;
            localStorage.removeItem('sm-keyImpacts');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKeyImpacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKeyImpacts.fulfilled, (state, action: PayloadAction<KeyImpactSlice[]>) => {
                state.keyImpacts = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyImpacts.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(getKeyImpactByKeyId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKeyImpactByKeyId.fulfilled, (state, action: PayloadAction<KeyImpactSlice[]>) => {
                state.keyImpacts = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyImpactByKeyId.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(createKeyImpact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createKeyImpact.fulfilled, (state, action: PayloadAction<KeyImpactSlice[]>) => {
                state.keyImpact = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createKeyImpact.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

    },
});

export const { clearKeyImpacts } = keyImpactSlice.actions;
export const keyImpactActions = {
    getKeyImpacts,
    getKeyImpactById,
    getKeyImpactByKeyId,
    createKeyImpact,
    deleteKeyImpact,
    updateKeyImpact,
};
export const keyImpactReducer = keyImpactSlice.reducer;
