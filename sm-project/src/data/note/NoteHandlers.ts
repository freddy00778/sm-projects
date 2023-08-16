import { DataClient } from '../index';
import NoteController, { Controller } from './NoteController';
import { GetInput } from "./NoteData";

export const get = (note: Controller) => async (input: GetInput) => {
    return note.get(input);
}

export const getAll = (note: Controller) => async (input: GetInput) => {
    return note.getAll(input);
}

export const update = (note: Controller) => async (input: GetInput) => {
    return note.update(input);
}

export const insert = (note: Controller) => async (input: GetInput) => {
    return note.insert(input);
}

export const deleteNote = (note: Controller) => async (input: GetInput) => {
    return note.deleteNote(input);
}

export async function create(data: DataClient) {
    const notes = await NoteController.create(data);

    return {
        get: get(notes),
        getAll: getAll(notes),
        update: update(notes),
        insert: insert(notes),
        deleteNote: deleteNote(notes)
    };
}

export default { create };
