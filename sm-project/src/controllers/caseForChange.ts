import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import CaseForChangeHandlers from "../data/caseForChange/CaseForChangeHandlers";

export const getCaseForChanges = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const caseForChangeHandler = await CaseForChangeHandlers.create(data)

    console.log("Body", req.query)
    const caseForChanges = await caseForChangeHandler.getAll({})
    res.respond({ data: caseForChanges });
});

export const getCaseForChange = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const caseForChangeHandler = await CaseForChangeHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing Case for Change id").status(400)
        throw new Error('Missing Case for Change id');
    }
    const type = req.query.type ? {project_id: req.params.id} : {id}
    const caseForChange = await caseForChangeHandler.get(type)

    res.respond({ data: caseForChange });
});

export const addCaseForChange = catchErrors(async (req, res) => {
    const caseForChangeData = req.body;

    if (!caseForChangeData) {
        res.status(400).send("Missing Case for Change data");
        throw new Error('Missing Case for Change data');
    }

    const data = await DataProvider.create();
    const caseForChangeHandler = await CaseForChangeHandlers.create(data);

    let caseForChange;
    caseForChange = await caseForChangeHandler.insert(caseForChangeData);

    res.respond({ data: caseForChange });
})

export const updateCaseForChange = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const caseForChangeHandler = await CaseForChangeHandlers.create(data)

    const id = req.body.project_id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing Case for Change id or update data").status(400)
        throw new Error('Missing Case for Change id or update data');
    }

    const caseForChange = await caseForChangeHandler.update({ ...updateData, project_id:id })

    res.respond({ caseForChange });
});

export const deleteCaseForChange = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const caseForChangeHandler = await CaseForChangeHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing Case for Change id").status(400)
        throw new Error('Missing Case for Change id');
    }

    await caseForChangeHandler.deleteCaseForChange({ id })

    res.respond({ message: 'Case for Change deleted successfully' });
});
