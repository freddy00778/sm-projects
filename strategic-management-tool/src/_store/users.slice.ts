// @ts-nocheck

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../_helpers';

// create slice
const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

// implementation
function createInitialState() {
    return {
        user: {},
        users: {},
        checkoutUser: null,
        createUser: false,
        userCount: 0,
        loading: false
    }
}

function createExtraActions() {
    // const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/users`;

    return {
        getAll: getAll(),
        getUser: getUser(),
        addUser: addUser(),
        updateUser: updateUser(),
        getCount: getCount()
    };

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`${baseUrl}/api/v1/users`)
        );
    }


    function addUser() {
        return createAsyncThunk(
            `${name}/addUser`,
            async (body) => await fetchWrapper.post(baseUrl,body)
        );
    }


    function updateUser() {
        return createAsyncThunk(
            `${name}/updateUser`,
            async (body) => await fetchWrapper.patch(baseUrl,body)
        );
    }

    function getUser() {
        return createAsyncThunk(
            `${name}/getUser`,
            async (body) => await fetchWrapper.get(`${baseUrl}/api/v1/user`)
        );
    }

    function getCount() {
        return createAsyncThunk(
            `${name}/getCount`,
            async (body) => await fetchWrapper.get(baseUrl)
        );
    }
}

function createReducers() {
    return {
        setCheckoutUser,
        setCreateUser,
        setLoading
    }

    function setCheckoutUser(state, action){
        state.checkoutUser = action.payload
    }

    function setCreateUser(state, action){
        state.createUser = action.payload
    }

    function setLoading(state, action){
        state.loading = action.payload
    }


}

function createExtraReducers() {
    return {
        ...getAll(),
        ...getUser(),
        ...addUser(),
        ...getCount()
    };

    function getAll() {
        const { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
                state.loading = true
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
                state.loading = false

            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
                state.loading = false
            }
        };
    }

    function getUser() {
        const { pending, fulfilled, rejected } = extraActions.getUser;
        return {
            [pending]: (state) => {
                state.user = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.user = action.payload;
            },
            [rejected]: (state, action) => {
                state.user = { error: action.error };
            }
        }
    }

    function addUser() {
        const { pending, fulfilled, rejected } = extraActions.addUser;
        return {
            [pending]: (state) => {
                state.user = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.user = action.payload;
            },
            [rejected]: (state, action) => {
                state.user = { error: action.error };
            }
        }
    }

    function getCount() {
        const { pending, fulfilled, rejected } = extraActions.getCount;
        return {
            [pending]: (state) => {
                state.userCount = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.userCount = action.payload;
            },
            [rejected]: (state, action) => {
                state.userCount = { error: action.error };
            }
        }
    }
}
