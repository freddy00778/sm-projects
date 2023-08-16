import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import DecisionRegisterHandlers from "../data/decisionRegister/DecisionRegisterHandlers";

export const getDecisions = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const decisionRegisterHandler = await DecisionRegisterHandlers.create(data)
    console.log("body", req.query)

    const decisions = (await decisionRegisterHandler.getAll()).map((dec, index) => {
        return {
            No: index+1,
            ...dec
        }
    })

    res.respond({ data:  decisions});
});

export const getDecisionRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const decisionRegisterHandler = await DecisionRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing decision register id").status(400)
        throw new Error('Missing decision register id');
    }

    const scope = await decisionRegisterHandler.get({ id })

    res.respond({ scope });
});

export const addDecisionRegister = catchErrors(async (req, res) => {
    const scopeData = req.body;

    if (!scopeData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();
    const decisionRegisterHandler = await DecisionRegisterHandlers.create(data)

    await decisionRegisterHandler.insert(scopeData);
    res.respond({ message : "success"});
})


export const updateDecisionRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const decisionRegisterHandler = await DecisionRegisterHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing scope id or update data").status(400)
        throw new Error('Missing scope id or update data');
    }

     await decisionRegisterHandler.update({ ...updateData, id })

    res.respond({ message: "success" });
});

export const deleteDecisionRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const decisionRegisterHandler = await DecisionRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing decision register id").status(400)
        throw new Error('Missing decision register id');
    }

    await decisionRegisterHandler.deleteRegister({ id })

    res.respond({ message: 'Decision register deleted successfully' });
});

