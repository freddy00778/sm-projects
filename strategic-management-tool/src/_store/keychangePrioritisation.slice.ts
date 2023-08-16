import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface KeyChangePrioritisationSlice {
    id: string;
    // Add other properties specific to KeyChangePrioritisation here.
}

interface KeyChangePrioritisationState {
    keyChangePrioritisation: KeyChangePrioritisationSlice | null;
    keyChangePrioritisations: KeyChangePrioritisationSlice[] | null;
    isLoading: boolean;
    error: any;
}

const keyChangePrioritisationName = 'keyChangePrioritisations';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: KeyChangePrioritisationState = {
    keyChangePrioritisation: null,
    keyChangePrioritisations: null,
    isLoading: false,
    error: null
};

const getKeyChangePrioritisations = createAsyncThunk(`${keyChangePrioritisationName}/getKeyChangePrioritisations`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-change-prioritisations`);
});

const getKeyChangePrioritisationById = createAsyncThunk(`${keyChangePrioritisationName}/getKeyChangePrioritisationById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-change-prioritisations/${id}`);
});

const getKeyChangePrioritisationByKeyId = createAsyncThunk(`${keyChangePrioritisationName}/getKeyChangePrioritisationByKeyId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-change-prioritisations?id=${id}`);
});

const createKeyChangePrioritisation = createAsyncThunk(`${keyChangePrioritisationName}/createKeyChangePrioritisation`, async (keyChangePrioritisation: KeyChangePrioritisationSlice) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/key-change-prioritisations`, keyChangePrioritisation);
});

const deleteKeyChangePrioritisation = createAsyncThunk(`${keyChangePrioritisationName}/deleteKeyChangePrioritisation`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/key-change-prioritisations/${id}`);
});

const updateKeyChangePrioritisation = createAsyncThunk(`${keyChangePrioritisationName}/updateKeyChangePrioritisation`, async (keyChangePrioritisation: KeyChangePrioritisationSlice) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/key-change-prioritisations/${keyChangePrioritisation.id}`, keyChangePrioritisation);
});

const keyChangePrioritisationSlice = createSlice({
    name: keyChangePrioritisationName,
    initialState,
    reducers: {
        clearKeyChangePrioritisations: (state) => {
            state.keyChangePrioritisations = null;
            localStorage.removeItem('sm-keyChangePrioritisations');
        },
    },
    extraReducers: (builder) => {
        builder


            .addCase(getKeyChangePrioritisations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKeyChangePrioritisations.fulfilled, (state, action: PayloadAction<KeyChangePrioritisationSlice[]>) => {
                state.keyChangePrioritisations = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyChangePrioritisations.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })


            .addCase(getKeyChangePrioritisationByKeyId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKeyChangePrioritisationByKeyId.fulfilled, (state, action: PayloadAction<KeyChangePrioritisationSlice[]>) => {
                state.keyChangePrioritisations = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyChangePrioritisationByKeyId.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            .addCase(getKeyChangePrioritisationById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKeyChangePrioritisationById.fulfilled, (state, action: PayloadAction<KeyChangePrioritisationSlice>) => {
                state.keyChangePrioritisation = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(getKeyChangePrioritisationById.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(createKeyChangePrioritisation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createKeyChangePrioritisation.fulfilled, (state, action: PayloadAction<KeyChangePrioritisationSlice>) => {
                state.keyChangePrioritisation = action.payload;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(createKeyChangePrioritisation.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { clearKeyChangePrioritisations } = keyChangePrioritisationSlice.actions;
export const keyChangePrioritisationActions = {
    getKeyChangePrioritisations,
    getKeyChangePrioritisationById,
    getKeyChangePrioritisationByKeyId,
    createKeyChangePrioritisation,
    deleteKeyChangePrioritisation,
    updateKeyChangePrioritisation,
};
export const keyChangePrioritisationReducer = keyChangePrioritisationSlice.reducer;
