import { catchErrors } from '../errors';
import DataProvider from '../data/DataProvider';
import KeyChangePrioritisationHandlers from '../data/keyChangePrioritisation/KeyChangePrioritisationHandlers';
import { humanReadableDate } from '../utils/generalUtils';

export const getKeyChangePrioritisation = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangePrioritisationHandler = await KeyChangePrioritisationHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send('Missing key change prioritisation id').status(400);
        throw new Error('Missing key change prioritisation id');
    }

    const prioritisation = await keyChangePrioritisationHandler.get({ id });
    res.respond({ data: prioritisation });
});

export const getKeyChangePrioritisations = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangePrioritisationHandler = await KeyChangePrioritisationHandlers.create(data);
    console.log('Body', req.params);

    const queryObject: any = req.query ? {key_change_id: req.query.id} : {}
    const keyChangePrioritisations =  (await keyChangePrioritisationHandler.getAll(queryObject))

    const prioritisations = keyChangePrioritisations.map((dec, index) => {
        return {
            No: index + 1,
            created_at: humanReadableDate(dec.created_at?.toString()),
            ...dec,
        };
    });

    res.respond({ data: prioritisations });
});

export const addKeyChangePrioritisation = catchErrors(async (req, res) => {
    const prioritisationData = req.body;

    if (!prioritisationData) {
        res.status(400).send('Missing key change prioritisation data');
        throw new Error('Missing key change prioritisation data');
    }

    const data = await DataProvider.create();
    const keyChangePrioritisationHandler = await KeyChangePrioritisationHandlers.create(data)
    const exists = await keyChangePrioritisationHandler.get({key_change_id: req.body.key_change_id})
    let prioritisation;

    if (exists){
        await keyChangePrioritisationHandler.update({
            id: exists?.id,
            ...req.body
        })
    }else{
        prioritisation = await keyChangePrioritisationHandler.insert(prioritisationData);
    }

    res.respond({ data: prioritisation });
});

export const updateKeyChangePrioritisation = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangePrioritisationHandler = await KeyChangePrioritisationHandlers.create(data);

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send('Missing key change prioritisation id or update data').status(400);
        throw new Error('Missing key change prioritisation id or update data');
    }

    const prioritisation = await keyChangePrioritisationHandler.update({ ...updateData, id });
    res.respond({ data: prioritisation });
});

export const deleteKeyChangePrioritisation = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangePrioritisationHandler = await KeyChangePrioritisationHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send('Missing key change prioritisation id').status(400);
        throw new Error('Missing key change prioritisation id');
    }

    await keyChangePrioritisationHandler.deletePrioritisation({ id });
    res.respond({ message: 'Key change prioritisation deleted successfully' });
});
