// @ts-nocheck

// Slice and Thunks for Projects API

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Project {
    id:string
}

interface ProjectState {
    project: Project | null;
    projects: Project[] | null;
    isLoading: boolean;
    error: any;
}

// create slice
const projectName = 'projects';
const initialProjectState = createProjectInitialState();
const projectReducers = createProjectReducers();
const extraProjectActions = createProjectExtraActions();
const extraProjectReducers = createProjectExtraReducers();
const projectSlice = createSlice({
    name: projectName,
    initialState: initialProjectState,
    reducers: projectReducers,
    extraReducers: extraProjectReducers
});

// exports
export const projectActions = { ...projectSlice.actions, ...extraProjectActions };
export const projectReducer = projectSlice.reducer;

// implementation
function createProjectInitialState(): ProjectState {
    return {
        // projects: JSON.parse(localStorage.getItem('sm-projects') || 'null'),
        project: {},
        projects: [],
        isLoading: false,
        error: null
    }
}

function createProjectReducers() {
    return {
        clearProjects,
    };

    function clearProjects(state: ProjectState) {
        state.project = null;
        localStorage.removeItem('sm-projects');
    }
}

function createProjectExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getProjectsByOrgId: createAsyncThunk(
            `${projectName}/getProjectsByOrgId`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/projects?org_id=${id}`);
            }
        ),
        getProjectById: createAsyncThunk(
            `${projectName}/getProjectById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/projects/${id}`);
            }
        ),
        createProject: createAsyncThunk(
            `${projectName}/createProject`,
            async (project: Project) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/projects`, project);
            }
        ),
        deleteProject: createAsyncThunk(
            `${projectName}/deleteProject`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/projects/${id}`);
            }
        ),
        updateProject: createAsyncThunk(
            `${projectName}/updateProject`,
            async (project: Project) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/projects`, project);
            }
        )
    };
}

function createProjectExtraReducers() {
    return {

        [extraProjectActions.getProjectsByOrgId.fulfilled.toString()]: (state: ProjectState, action: PayloadAction<Project[]>) => {
            state.projects = action.payload; // assuming a single project gets stored
            state.isLoading = false
            state.error = null;
        },
        [extraProjectActions.getProjectsByOrgId.rejected.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraProjectActions.getProjectsByOrgId.pending.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },

        [extraProjectActions.getProjectById.fulfilled.toString()]: (state: ProjectState, action: PayloadAction<Project>) => {
            state.project = action.payload; // assuming a single project gets stored
            state.isLoading = false
            state.error = null;
        },
        [extraProjectActions.getProjectById.rejected.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraProjectActions.getProjectById.pending.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },

        [extraProjectActions.getProjectById.fulfilled.toString()]: (state: ProjectState, action: PayloadAction<Project>) => {
            state.project = action.payload; // assuming a single project gets stored
            state.isLoading = false

            state.error = null;
        },
        [extraProjectActions.getProjectById.rejected.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraProjectActions.createProject.fulfilled.toString()]: (state: ProjectState, action: PayloadAction<Project>) => {
            // Assuming the backend returns the created project
            state.isLoading = false
            const project = action.payload;
            if (state.project) {
                state.project = project;
            } else {
                state.project = project;
            }
            state.error = null;
        },
        [extraProjectActions.createProject.rejected.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false
        },

        [extraProjectActions.createProject.pending.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true
        },

        [extraProjectActions.deleteProject.fulfilled.toString()]: (state: ProjectState, action: PayloadAction<{id: string}>) => {
            state.isLoading = false

            if (state.project) {
                state.project = action.payload
            }
            state.error = null;
        },
        [extraProjectActions.deleteProject.rejected.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraProjectActions.updateProject.fulfilled.toString()]: (state: ProjectState, action: PayloadAction<Project>) => {
            state.isLoading = false
            state.project = action.payload;
        },
        [extraProjectActions.updateProject.rejected.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload;
        },

        [extraProjectActions.updateProject.pending.toString()]: (state: ProjectState, action: PayloadAction<any>) => {
            state.isLoading = true
            state.error = action.payload;
        }
    };
}


