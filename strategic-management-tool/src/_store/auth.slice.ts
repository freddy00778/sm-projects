import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { history, fetchWrapper } from '../_helpers';

interface User {
    email,
    firstName
}

interface State {
    user: User | null;
    isLoading: boolean;
    isLoggedOut: boolean;
    error: any;
    isAdminLoginOpen: boolean;
    isVerified: boolean;
}

// create slice
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation
function createInitialState(): State {
    return {
        isLoading: false,
        user: JSON.parse(localStorage.getItem('sm-user') || 'null'),
        isLoggedOut: false,
        error: null,
        isAdminLoginOpen: false,
        isVerified:false
    }
}

function createReducers() {
    return {
        logout,
        setLogout,
        openAdminLogin
    };

    function logout(state: State) {
        state.user = null;
        localStorage.removeItem('sm-user');
    }

    function openAdminLogin(state: State){
        state.isAdminLoginOpen = true
        state.error = null
    }

    function setLogout(state: State, action: PayloadAction<boolean>){
        state.isLoggedOut = action.payload
    }

    function clearErrors(state: State){
        state.error = null
    }
}

function createExtraActions() {
    // const baseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        login: createAsyncThunk(
            `${name}/login`,
            async ({ email, password }: { email: string, password: string }) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/auth/login`, { email, password });
            }
        ),
        verifySms: createAsyncThunk(
            `${name}/verifySms`,
            async ({ code }: { code: string }) => {
                return await fetchWrapper.post(`${baseUrl}/auth/verify-sms`, { code });
            }
        )
    };
}

function createExtraReducers() {
    return {
        [extraActions.login.pending.toString()]: (state: State) => {
            state.error = null;
            state.isLoading = true
        },
        [extraActions.login.fulfilled.toString()]: (state: State, action: PayloadAction<User>) => {
            const user = action.payload;
            localStorage.setItem('sm-user', JSON.stringify(user));
            state.user = user;
            state.isLoggedOut = false
        },
        [extraActions.login.rejected.toString()]: (state: State, action: PayloadAction<any>) => {
            state.isLoading = false

            if (action.error.message.includes("401")){
                state.error = {message : "Username or password is incorrect!" }
                return;
            }else if (action.error.message.includes("403")){
                state.error = {message : "Account not activated or license has expired!" }
                return
            }else if (action.error.message.includes("400")){
                state.error = {message : "Username and password are required!" }
                return
            }


            state.error = action.error.message;
            console.log("error object", action)
        },
        [extraActions.verifySms.pending.toString()]: (state: State) => {
            state.error = null
        },
        [extraActions.verifySms.fulfilled.toString()]: (state: State, action: PayloadAction<{verified: boolean}>) => {
            state.isVerified = action.payload.verified
        },
        [extraActions.verifySms.rejected.toString()]: (state: State, action: PayloadAction<any>) => {
            state.isVerified = false
            state.error = action.payload
        }
    };
}
