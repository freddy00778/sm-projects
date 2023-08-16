import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import KeyImpactDepartmentHandlers from "../data/keyImpactDepartment/KeyImpactDepartmentHandlers";

export const getKeyImpactDepartments = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactDepartmentHandler = await KeyImpactDepartmentHandlers.create(data)

    let keyImpactDepartments;

    if (req.query.id){
        keyImpactDepartments = await keyImpactDepartmentHandler.getAll({key_change_id: req.query.id?.toString()});
    }else {
        keyImpactDepartments = await keyImpactDepartmentHandler.getAll({});
    }

    res.respond({ data: keyImpactDepartments });
});

export const getKeyImpactDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactDepartmentHandler = await KeyImpactDepartmentHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.status(400).send("Missing KeyImpactDepartment id");
        throw new Error('Missing KeyImpactDepartment id');
    }

    const keyImpactDepartment = await keyImpactDepartmentHandler.get({ id });
    res.respond({ keyImpactDepartment });
});

export const addKeyImpactDepartment = catchErrors(async (req, res) => {
    const keyImpactDepartmentData = req.body;

    if (!keyImpactDepartmentData) {
        res.status(400).send("Missing KeyImpactDepartment data");
        throw new Error('Missing KeyImpactDepartment data');
    }

    const data = await DataProvider.create();
    const keyImpactDepartmentHandler = await KeyImpactDepartmentHandlers.create(data);

    const keyImpactDepartment = await keyImpactDepartmentHandler.insert(keyImpactDepartmentData);
    res.respond({ keyImpactDepartment });
});

export const updateKeyImpactDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactDepartmentHandler = await KeyImpactDepartmentHandlers.create(data);

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.status(400).send("Missing KeyImpactDepartment id or update data");
        throw new Error('Missing KeyImpactDepartment id or update data');
    }

    const keyImpactDepartment = await keyImpactDepartmentHandler.update({ ...updateData, id });
    res.respond({ keyImpactDepartment });
});

export const deleteKeyImpactDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactDepartmentHandler = await KeyImpactDepartmentHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.status(400).send("Missing KeyImpactDepartment id");
        throw new Error('Missing KeyImpactDepartment id');
    }

    await keyImpactDepartmentHandler.deleteKeyImpactDepartment({ id });
    res.respond({ message: 'KeyImpactDepartment deleted successfully' });
});
