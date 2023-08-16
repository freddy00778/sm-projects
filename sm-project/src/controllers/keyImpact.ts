import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import KeyImpactHandlers from "../data/keyImpact/KeyImpactHandlers";
import KeyImpactDepartmentHandlers from "../data/keyImpactDepartment/KeyImpactDepartmentHandlers";

export const getKeyImpacts = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactHandler = await KeyImpactHandlers.create(data);

    console.log("Body", req.query);

    let keyImpacts;

    if (req.query.id){
        keyImpacts = await keyImpactHandler.getAll({key_change_id: req.query.id?.toString()});
    }else {
        keyImpacts = await keyImpactHandler.getAll({});
    }

    res.respond({ data: keyImpacts });
});

export const getKeyImpact = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactHandler = await KeyImpactHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.status(400).send("Missing KeyImpact id");
        throw new Error('Missing KeyImpact id');
    }

    const keyImpact = await keyImpactHandler.get({ id });
    res.respond({ keyImpact });
});

export const addKeyImpact = catchErrors(async (req, res) => {
    const keyImpactData = req.body;

    if (!keyImpactData) {
        res.status(400).send("Missing KeyImpact data");
        throw new Error('Missing KeyImpact data');
    }

    const data = await DataProvider.create();
    const keyImpactHandler = await KeyImpactHandlers.create(data);
    const keyDepartmentHandler = await KeyImpactDepartmentHandlers.create(data);
    const exists = await keyImpactHandler.get({key_change_id: req.body.key_change_id})
    let keyImpact;

    if (req.body.selectedDepartments){
        await keyDepartmentHandler.deleteKeyImpactDepartment({key_change_id: req.body.key_change_id })
    }

    if (exists && req.body.selectedDepartments){
        for (let selectedDepartment of req.body.selectedDepartments){
            const keyImpactDepartment = await keyDepartmentHandler.get({key_impact_id: exists?.id, department_id: selectedDepartment?.value})

            if (!keyImpactDepartment){
                await keyDepartmentHandler.insert({
                    key_impact_id:  exists?.id,
                    key_change_id:  req.body.key_change_id,
                    department_id: selectedDepartment?.value
                })
            }
        }
        return res.respond({ data: {} });
    }

    if (exists){
        keyImpact = await keyImpactHandler.update({
            id: exists?.id,
            ...req.body
        })
    }else{
        keyImpact = await keyImpactHandler.insert({
            ...req.body
        })
    }



    // const keyImpact = await keyImpactHandler.insert(keyImpactData);
    res.respond({ keyImpact });
});

export const updateKeyImpact = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactHandler = await KeyImpactHandlers.create(data);

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.status(400).send("Missing KeyImpact id or update data");
        throw new Error('Missing KeyImpact id or update data');
    }

    const keyImpact = await keyImpactHandler.update({ ...updateData, id });
    res.respond({ keyImpact });
});

export const deleteKeyImpact = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const keyImpactHandler = await KeyImpactHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.status(400).send("Missing KeyImpact id");
        throw new Error('Missing KeyImpact id');
    }

    await keyImpactHandler.deleteKeyImpact({ id });
    res.respond({ message: 'KeyImpact deleted successfully' });
});
