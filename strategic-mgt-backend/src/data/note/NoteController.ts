import NoteData , {Data, GetInput} from './NoteData';
import {DataClient} from '../index';

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteNote: ReturnType<typeof deleteNote>,
}

export const get = (notes: Data) => async (input: GetInput) => {
    return notes.get(input);
}

export const getAll = (notes: Data) => async (input: GetInput) => {
    return notes.getAll(input);
}

export const update = (notes: Data) => async (input: GetInput) => {
    return notes.update(input);
}

export const insert = (notes: Data) => async (input: GetInput) => {
    return notes.insert(input);
}

export const deleteNote = (notes: Data) => async (input: GetInput) => {
    return notes.deleteNote(input);
}

export async function create(data: DataClient): Promise<Controller> {
    const notes = await NoteData.create(data);

    return {
        get: get(notes),
        getAll: getAll(notes),
        update: update(notes),
        insert: insert(notes),
        deleteNote: deleteNote(notes),
    };
}

export default { create };
