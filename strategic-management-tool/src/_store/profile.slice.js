import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../_helpers';

// create slice
const name = 'profile';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const profileActions = { ...slice.actions, ...extraActions };
export const profilesReducer = slice.reducer;

// implementation
function createInitialState() {
    return {
        profile: {},
        open: false,
        loading: false
    }
}

function createExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getAll: getAll()
    };

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createReducers() {
    return {
        setLoading,
        openProfile
    }

    function openProfile(state, action){
        state.open = action.payload
    }

    function setLoading(state, action){
        state.loading = action.payload
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        const { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.draws = { loading: true };
                state.loading = true
            },
            [fulfilled]: (state, action) => {
                state.draws = action.payload;
                state.loading = false
            },
            [rejected]: (state, action) => {
                state.draws = { error: action.error };
                state.loading = false
            }
        };
    }

}
