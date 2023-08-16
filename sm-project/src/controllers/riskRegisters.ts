import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import RiskRegisterHandlers from "../data/riskRegister/RiskRegisterHandlers";

export const getRisks = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskRegisterHandler = await RiskRegisterHandlers.create(data)
    console.log("body", req.query)

    let risks;

    if (req.query.key_change_id){
        risks = (await riskRegisterHandler.getAll({key_change_id: req.query.key_change_id?.toString()}))
    }

    const mappedRisks = risks.map((risk, index) => {
        return {
            No: index+1,
            ...risk
        }
    })

    res.respond({ data:  mappedRisks});
});

export const getRiskRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskRegisterHandler = await RiskRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing risk register id").status(400)
        throw new Error('Missing risk register id');
    }

    const risk = await riskRegisterHandler.get({ id })

    res.respond({ risk });
});

export const addRiskRegister = catchErrors(async (req, res) => {
    const riskData = req.body;

    if (!riskData) {
        res.status(400).send("Missing risk data");
        throw new Error('Missing risk data');
    }

    const data = await DataProvider.create();
    const riskRegisterHandler = await RiskRegisterHandlers.create(data)

    await riskRegisterHandler.insert(riskData);
    res.respond({ message : "success"});
})


export const updateRiskRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskRegisterHandler = await RiskRegisterHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing risk id or update data").status(400)
        throw new Error('Missing risk id or update data');
    }

    await riskRegisterHandler.update({ ...updateData, id })

    res.respond({ message: "success" });
});

export const deleteRiskRegister = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskRegisterHandler = await RiskRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing risk register id").status(400)
        throw new Error('Missing risk register id');
    }

    await riskRegisterHandler.deleteRegister({ id })

    res.respond({ message: 'Risk register deleted successfully' });
});
