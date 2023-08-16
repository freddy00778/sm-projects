import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";
import KeyChanges from "../Pages/Project/KeyChanges";

interface KeyChange {
    id: string
    // your key change properties
}

interface KeyChangeState {
    keyChange: KeyChange | null;
    keyChanges: KeyChange[] | null;
    isLoading: boolean;
    error: any;
}

const keyChangeName = 'keyChanges';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: KeyChangeState = {
    keyChange: null,
    keyChanges: null,
    isLoading: false,
    error: null
};

const getKeyChanges = createAsyncThunk(`${keyChangeName}/getKeyChanges`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-changes`);
});

const getKeyChangeById = createAsyncThunk(`${keyChangeName}/getKeyChangeById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/key-changes/${id}`);
});

const createKeyChange = createAsyncThunk(`${keyChangeName}/createKeyChange`, async (keyChange: KeyChange) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/key-changes`, keyChange);
});

const deleteKeyChange = createAsyncThunk(`${keyChangeName}/deleteKeyChange`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/key-changes/${id}`);
});

const updateKeyChange = createAsyncThunk(`${keyChangeName}/updateKeyChange`, async (keyChange: KeyChange) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/key-changes`, keyChange);
});

const keyChangeSlice = createSlice({
    name: keyChangeName,
    initialState,
    reducers: {
        clearKeyChanges: (state) => {
            state.keyChanges = null;
            localStorage.removeItem('sm-keyChanges');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getKeyChanges.fulfilled, (state, action) => {
                state.keyChanges = action.payload;
                state.error = null;
                state.isLoading = false
            })
            .addCase(getKeyChanges.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })
            .addCase(getKeyChanges.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getKeyChangeById.fulfilled, (state, action) => {
                state.keyChange = action.payload;
                state.error = null;
                state.isLoading = false
            })

            .addCase(getKeyChangeById.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(getKeyChangeById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })
            .addCase(createKeyChange.fulfilled, (state, action) => {
                const keyChange = action.payload;
                state.keyChange = keyChange;
                state.error = null;
            })
            .addCase(createKeyChange.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteKeyChange.pending, (state, action) => {
                state.keyChange = action.payload
                state.isLoading = true
                state.error = null;
            })

            .addCase(deleteKeyChange.fulfilled, (state, action) => {
                state.keyChange = action.payload;
                state.isLoading = false
                state.error = null;
            })
            .addCase(deleteKeyChange.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })
            .addCase(updateKeyChange.fulfilled, (state, action) => {
                state.keyChange = action.payload;
            })
            .addCase(updateKeyChange.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearKeyChanges } = keyChangeSlice.actions;
export const keyChangeActions = {
    getKeyChanges,
    getKeyChangeById,
    createKeyChange,
    deleteKeyChange,
    updateKeyChange,
};
export const keyChangeReducer = keyChangeSlice.reducer;
