import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import KeyChangeDepartmentHandlers from "../data/keychangeDepartment/KeyChangeDepartmentHandlers";

export const getKeyChangeDepartments = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangeDepartmentHandler = await KeyChangeDepartmentHandlers.create(data);

    console.log("Body", req.query);

    let keyChangeDepartments;

     if (req.query.id){
         keyChangeDepartments = await keyChangeDepartmentHandler.getAll({key_change_id: req.query.id?.toString()});
     }else {
         keyChangeDepartments = await keyChangeDepartmentHandler.getAll({});
     }

    res.respond({ data: keyChangeDepartments });
});

export const getKeyChangeDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangeDepartmentHandler = await KeyChangeDepartmentHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.status(400).send("Missing KeyChangeDepartment id");
        throw new Error('Missing KeyChangeDepartment id');
    }

    const keyChangeDepartment = await keyChangeDepartmentHandler.get({ id });
    res.respond({ keyChangeDepartment });
});

export const addKeyChangeDepartment = catchErrors(async (req, res) => {
    const keyChangeDepartmentData = req.body;

    if (!keyChangeDepartmentData) {
        res.status(400).send("Missing KeyChangeDepartment data");
        throw new Error('Missing KeyChangeDepartment data');
    }

    const data = await DataProvider.create();
    const keyChangeDepartmentHandler = await KeyChangeDepartmentHandlers.create(data);

    const keyChangeDepartment = await keyChangeDepartmentHandler.insert(keyChangeDepartmentData);
    res.respond({ keyChangeDepartment });
});

export const updateKeyChangeDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangeDepartmentHandler = await KeyChangeDepartmentHandlers.create(data);

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.status(400).send("Missing KeyChangeDepartment id or update data");
        throw new Error('Missing KeyChangeDepartment id or update data');
    }

    const keyChangeDepartment = await keyChangeDepartmentHandler.update({ ...updateData, id });
    res.respond({ keyChangeDepartment });
});

export const deleteKeyChangeDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyChangeDepartmentHandler = await KeyChangeDepartmentHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.status(400).send("Missing KeyChangeDepartment id");
        throw new Error('Missing KeyChangeDepartment id');
    }

    await keyChangeDepartmentHandler.deleteKeyChangeDepartment({ id });
    res.respond({ message: 'KeyChangeDepartment deleted successfully' });
});
