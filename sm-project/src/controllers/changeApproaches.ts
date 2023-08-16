import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import ChangeApproachHandlers from "../data/changeApproach/ChangeApproachHandlers";

export const getChangeApproaches = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const changeApproachHandler = await ChangeApproachHandlers.create(data)

    console.log("Body", req.query)
    const changeApproaches = await changeApproachHandler.getAll({})
    res.respond({ data: changeApproaches });
});

export const getChangeApproach = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const changeApproachHandler = await ChangeApproachHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing change approach id").status(400)
        throw new Error('Missing change approach id');
    }
    const type = req.query.type ? {project_id: req.params.id} : {id}
    const changeApproach = await changeApproachHandler.get(type )

    res.respond({ data: changeApproach });
});

export const addChangeApproach = catchErrors(async (req, res) => {
    const changeApproachData = req.body;

    if (!changeApproachData) {
        res.status(400).send("Missing change approach data");
        throw new Error('Missing change approach data');
    }

    const data = await DataProvider.create();
    const changeApproachHandler = await ChangeApproachHandlers.create(data);
    const changeApproachExists = await changeApproachHandler.get({project_id: req.body.project_id})

    let changeApproach;

    if (changeApproachExists){
        changeApproach = await changeApproachHandler.update({
            id: changeApproachExists?.id,
            ...req.body
        })
    }else{
        changeApproach = await changeApproachHandler.insert(changeApproachData);
    }

    res.respond({ data: changeApproach });
})

export const updateChangeApproach = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const changeApproachHandler = await ChangeApproachHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing change approach id or update data").status(400)
        throw new Error('Missing change approach id or update data');
    }

    const changeApproach = await changeApproachHandler.update({ ...updateData, id })

    res.respond({ changeApproach });
});

export const deleteChangeApproach = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const changeApproachHandler = await ChangeApproachHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing change approach id").status(400)
        throw new Error('Missing change approach id');
    }

    await changeApproachHandler.deleteChangeApproach({ id })

    res.respond({ message: 'Change approach deleted successfully' });
});
