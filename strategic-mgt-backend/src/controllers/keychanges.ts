import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import KeyChangeHandlers from "../data/keyChange/KeyChangeHandlers";


export const getKeyChanges = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const keyChangeHandler = await KeyChangeHandlers.create(data)

    console.log("Body", req.query)
    const keyChanges = await keyChangeHandler.getAll({})
    res.respond({ data: keyChanges });
});

export const getKeyChange = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const keyChangeHandler = await KeyChangeHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing key change id").status(400)
        throw new Error('Missing key change id');
    }

    const keyChange = await keyChangeHandler.get({ id })

    res.respond({ keyChange });
});

export const addKeyChange = catchErrors(async (req, res) => {
    const keyChangeData = req.body;

    if (!keyChangeData) {
        res.status(400).send("Missing key change data");
        throw new Error('Missing key change data');
    }

    const data = await DataProvider.create();
    const keyChangeHandler = await KeyChangeHandlers.create(data);

    const keyChange = await keyChangeHandler.insert(keyChangeData);
    res.respond({ keyChange });
})


export const updateKeyChange = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const keyChangeHandler = await KeyChangeHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing key change id or update data").status(400)
        throw new Error('Missing key change id or update data');
    }

    const keyChange = await keyChangeHandler.update({ ...updateData, id })

    res.respond({ keyChange });
});

export const deleteKeyChange = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const keyChangeHandler = await KeyChangeHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing key change id").status(400)
        throw new Error('Missing key change id');
    }

    await keyChangeHandler.deleteKeyChange({ id })

    res.respond({ message: 'Key change deleted successfully' });
});
