import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import IssueRegisterHandlers from "../data/issueRegister/IssueRegisterHandlers";

export const getIssues = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const issueRegisterHandler = await IssueRegisterHandlers.create(data)
    console.log("body", req.query)

    let issues;

    if (req.query.key_change_id){
        issues = (await issueRegisterHandler.getAll({key_change_id: req.query.key_change_id?.toString()}))
    }

    // const issues = (await issueRegisterHandler.getAll()).map((iss, index) => {
    const mappedIssues = issues.map((iss, index) => {
        return {
            No: index+1,
            ...iss
        }
    })

    res.respond({ data:  mappedIssues});
});

export const getIssueRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const issueRegisterHandler = await IssueRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing issue register id").status(400)
        throw new Error('Missing issue register id');
    }

    const issue = await issueRegisterHandler.get({ id })

    res.respond({ issue });
});

export const addIssueRegister = catchErrors(async (req, res) => {
    const issueData = req.body;

    if (!issueData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();
    const issueRegisterHandler = await IssueRegisterHandlers.create(data)

    await issueRegisterHandler.insert(issueData);
    res.respond({ message : "success"});
})


export const updateIssueRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const issueRegisterHandler = await IssueRegisterHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing issue id or update data").status(400)
        throw new Error('Missing issue id or update data');
    }

    await issueRegisterHandler.update({ ...updateData, id })

    res.respond({ message: "success" });
});

export const deleteIssueRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const issueRegisterHandler = await IssueRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing issue register id").status(400)
        throw new Error('Missing issue register id');
    }

    await issueRegisterHandler.deleteRegister({ id })

    res.respond({ message: 'Issue register deleted successfully' });
});
