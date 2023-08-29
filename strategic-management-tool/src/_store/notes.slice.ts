// @ts-nocheck

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchWrapper} from "../_helpers/fetch-wrapper";

interface Note {
    id: string
}

interface NoteState {
    note: Note | null;
    notes: Note[] | null;
    isLoading: boolean;
    error: any;
}

// create slice
const name = 'notes';
const initialNoteState = createNoteInitialState();
const noteReducers = createNoteReducers();
const extraNoteActions = createNoteExtraActions();
const extraNoteReducers = createNoteExtraReducers();
const noteSlice = createSlice({
    name,
    initialState: initialNoteState,
    reducers: noteReducers,
    extraReducers: extraNoteReducers
});

// exports
export const noteActions = { ...noteSlice.actions, ...extraNoteActions };
export const noteReducer = noteSlice.reducer;

// implementation
function createNoteInitialState(): NoteState {
    return {
        note: {},
        notes: [],
        isLoading: false,
        error: null
    }
}

function createNoteReducers() {
    return {
        clearNotes,
    };

    function clearNotes(state: NoteState) {
        state.notes = null;
    }
}

function createNoteExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getAll: createAsyncThunk(
            `${name}/getAll`,
            async ({ key_change_id }: { key_change_id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/notes?key_change_id=${key_change_id}`);
            }
        ),

        getById: createAsyncThunk(
            `${name}/getById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/notes/${id}`);
            }
        ),

        createNote: createAsyncThunk(
            `${name}/createNote`,
            async (note: Note) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/notes`, note);
            }
        ),

        deleteNote: createAsyncThunk(
            `${name}/deleteNote`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/notes/${id}`);
            }
        ),

        updateNote: createAsyncThunk(
            `${name}/update`,
            async (note: Note) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/notes`, note);
            }
        )
    };
}

function createNoteExtraReducers() {
    return {
        [extraNoteActions.getAll.fulfilled.toString()]: (state: NoteState, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        [extraNoteActions.getAll.pending.toString()]: (state: NoteState, action: PayloadAction<Note>) => {
            state.isLoading = true;
            state.error = null;
        },

        [extraNoteActions.getAll.rejected.toString()]: (state: NoteState, action: PayloadAction<Note>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        [extraNoteActions.getById.fulfilled.toString()]: (state: NoteState, action: PayloadAction<Note>) => {
            state.note = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        [extraNoteActions.getById.pending.toString()]: (state: NoteState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true;
        },

        [extraNoteActions.getById.rejected.toString()]: (state: NoteState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        [extraNoteActions.createNote.fulfilled.toString()]: (state: NoteState, action: PayloadAction<Note>) => {
            const note = action.payload;
            if (state.note) {
                state.note = note;
            } else {
                state.note = note;
            }
            state.error = null;
            state.isLoading = false;
        },

        [extraNoteActions.createNote.pending.toString()]: (state: NoteState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = true;
        },

        [extraNoteActions.createNote.rejected.toString()]: (state: NoteState, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        [extraNoteActions.deleteNote.fulfilled.toString()]: (state: NoteState, action: PayloadAction<{id: string}>) => {
            if (state.note) {
                state.note = action.payload;
            }
            state.error = null;
        },

        [extraNoteActions.deleteNote.rejected.toString()]: (state: NoteState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },

        [extraNoteActions.updateNote.fulfilled.toString()]: (state: NoteState, action: PayloadAction<Note>) => {
            state.note = action.payload;
        },

        [extraNoteActions.updateNote.rejected.toString()]: (state: NoteState, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    };
}
