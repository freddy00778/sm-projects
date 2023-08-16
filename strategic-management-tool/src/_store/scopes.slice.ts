import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Scope {
    id: string
    in_scope: boolean
    // your scope properties
}

interface ScopeState {
    scope: Scope | null;
    scopes: Scope[] | null;
    isLoading: boolean;
    error: any;
}

const scopeName = 'scopes';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: ScopeState = {
    scope: null,
    scopes: null,
    isLoading: false,
    error: null
};

const getScopes = createAsyncThunk(`${scopeName}/getScopes`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/scopes`);
});

const getScopeByProjectId = createAsyncThunk(`${scopeName}/getScopeByProjectId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/scopes?project_id=${id}`);
});

const getScopeById = createAsyncThunk(`${scopeName}/getScopeById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/scopes/${id}`);
});

const createScope = createAsyncThunk(`${scopeName}/createScope`, async (scope: Scope) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/scopes`, scope);
});

const deleteScope = createAsyncThunk(`${scopeName}/deleteScope`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/scopes/${id}`);
});

const updateScope = createAsyncThunk(`${scopeName}/updateScope`, async (scope: Scope) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/scopes`, scope);
});

const scopeSlice = createSlice({
    name: scopeName,
    initialState,
    reducers: {
        clearScopes: (state) => {
            state.scope = null;
            localStorage.removeItem('sm-scopes');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getScopes.fulfilled, (state, action) => {
                state.isLoading = false
                state.scopes = action.payload;
                state.error = null;
            })
            .addCase(getScopes.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })

            .addCase(getScopes.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getScopeByProjectId.fulfilled, (state, action) => {
                state.isLoading = false
                state.scopes = action.payload;
                state.error = null;
            })
            .addCase(getScopeByProjectId.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })

            .addCase(getScopeByProjectId.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(getScopeById.fulfilled, (state, action) => {
                state.isLoading = false
                state.scope = action.payload;
                state.error = null;
            })
            .addCase(getScopeById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload;
            })

            .addCase(getScopeById.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(createScope.fulfilled, (state, action) => {
                const scope = action.payload;
                state.scope = scope;
                state.error = null;
                state.isLoading = false
            })
            .addCase(createScope.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false
            })

            .addCase(createScope.pending, (state, action) => {
                state.error = action.payload;
                state.isLoading = true
            })

            .addCase(deleteScope.fulfilled, (state, action) => {
                state.scope = action.payload;
                state.error = null;
            })
            .addCase(deleteScope.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateScope.fulfilled, (state, action) => {
                state.scope = action.payload;
            })
            .addCase(updateScope.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearScopes } = scopeSlice.actions;
export const scopeActions = {
    getScopes,
    getScopeById,
    getScopeByProjectId,
    createScope,
    deleteScope,
    updateScope,
};
export const scopeReducer = scopeSlice.reducer;
