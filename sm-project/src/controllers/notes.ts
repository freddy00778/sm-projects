import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";

import NoteHandlers from "../data/note/NoteHandlers";

export const getNotes = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const noteHandler = await NoteHandlers.create(data);

    console.log("Body", req.query);

    let notes;

    if (req.query.id) {
        notes = await noteHandler.getAll({ key_change_id: req.query.id?.toString() });
    } else {
        notes = await noteHandler.getAll({});
    }

    const mappedNotes =  notes.map((dec, index) => {
        return {
            No: index+1,
            ...dec
        }
    })

    res.respond({ data: mappedNotes });
});

export const getNote = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const noteHandler = await NoteHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send("Missing note id").status(400);
        throw new Error('Missing note id');
    }

    const keyChangeId = req.query ? { key_change_id: id } : { id };
    const note = await noteHandler.get(keyChangeId);

    res.respond({ note });
});

export const addNote = catchErrors(async (req, res) => {
    const noteData = req.body;

    if (!noteData) {
        res.status(400).send("Missing note data");
        throw new Error('Missing lesson data');
    }

    const data = await DataProvider.create();
    const noteHandler = await NoteHandlers.create(data);

    const lesson = await noteHandler.insert(noteData);
    res.respond({ data: lesson });
});

export const updateNote = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const noteHandler = await NoteHandlers.create(data);

    const id = req.params.id;
    const updateData = req.body;

    if (!id || !updateData) {
        res.send("Missing note id or update data").status(400);
        throw new Error('Missing note id or update data');
    }

    const note = await noteHandler.update({ ...updateData, id });

    res.respond({ note });
});

export const deleteNote = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const noteHandler = await NoteHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send("Missing note id").status(400);
        throw new Error('Missing note id');
    }

    await noteHandler.deleteNote({ id });

    res.respond({ message: 'Note deleted successfully' });
});

