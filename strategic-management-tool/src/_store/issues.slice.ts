// Slice and Thunks for Projects API

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Issue {
    id: string
}

interface IssueState {
    issue: Issue | null;
    issues: Issue[] | null;
    isLoading: boolean;
    error: any;
    issueAction: any

}

// create slice
const name = 'issues';
const initialIssueState = createIssueInitialState();
const issueReducers = createIssueReducers();
const extraIssueActions = createIssueExtraActions();
const extraIssueReducers = createIssueExtraReducers();
const issueSlice = createSlice({
    name,
    initialState: initialIssueState,
    reducers: issueReducers,
    extraReducers: extraIssueReducers
});

// exports
export const issueActions = { ...issueSlice.actions, ...extraIssueActions };
export const issueReducer = issueSlice.reducer;

// implementation
function createIssueInitialState(): IssueState {
    return {
        issue: {},
        issues: [],
        isLoading: false,
        error: null,
        issueAction: {}
    }
}

function createIssueReducers() {
    return {
        clearIssues,
        setClickedIssueAction
    };

    function clearIssues(state: IssueState) {
        state.issues = null;
    }

    function setClickedIssueAction(state: RiskState, value){
        state.issueAction = value;
    }
}

function createIssueExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getAll: createAsyncThunk(
            `${name}/getAll`,
            async ({ key_change_id }: { key_change_id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/issues?key_change_id=${key_change_id}`);
            }
        ),

        getById: createAsyncThunk(
            `${name}/getById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/issues/${id}`);
            }
        ),

        createIssue: createAsyncThunk(
            `${name}/createIssue`,
            async (issue: Issue) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/issues`, issue);
            }
        ),

        deleteIssue: createAsyncThunk(
            `${name}/deleteIssue`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/issues/${id}`);
            }
        ),

        updateIssue: createAsyncThunk(
            `${name}/update`,
            async (issue: Issue) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/issues`, issue);
            }
        )
    };
}

function createIssueExtraReducers() {
    return {
        [extraIssueActions.getAll.fulfilled.toString()]: (state: IssueState, action: PayloadAction<Issue[]>) => {
            state.issues = action.payload
            state.isLoading = false
            state.error = null;
        },

        [extraIssueActions.getAll.pending.toString()]: (state: IssueState, action: PayloadAction<Issue>) => {
            state.isLoading = true
            state.error = null;
        },

        [extraIssueActions.getAll.rejected.toString()]: (state: IssueState, action: PayloadAction<Issue>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraIssueActions.getById.fulfilled.toString()]: (state: IssueState, action: PayloadAction<Issue>) => {
            state.issue = action.payload;
            state.isLoading = false
            state.error = null;
        },

        [extraIssueActions.getById.pending.toString()]: (state: IssueState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },

        [extraIssueActions.getById.rejected.toString()]: (state: IssueState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraIssueActions.createIssue.fulfilled.toString()]: (state: IssueState, action: PayloadAction<Issue>) => {
            const issue = action.payload;
            if (state.issue) {
                state.issue = issue;
            } else {
                state.issue = issue;
            }
            state.error = null;
            state.isLoading = false
        },

        [extraIssueActions.createIssue.pending.toString()]: (state: IssueState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },

        [extraIssueActions.createIssue.rejected.toString()]: (state: IssueState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraIssueActions.deleteIssue.fulfilled.toString()]: (state: IssueState, action: PayloadAction<{id: string}>) => {
            if (state.issue) {
                state.issue = action.payload
            }
            state.error = null;
        },

        [extraIssueActions.deleteIssue.rejected.toString()]: (state: IssueState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },

        [extraIssueActions.updateIssue.fulfilled.toString()]: (state: IssueState, action: PayloadAction<Issue>) => {
            state.issue = action.payload;
        },

        [extraIssueActions.updateIssue.rejected.toString()]: (state: IssueState, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    };
}
