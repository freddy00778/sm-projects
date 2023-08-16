import { catchErrors } from '../errors';
import DataProvider from '../data/DataProvider';
import RiskLeverHandlers from '../data/riskLever/RiskLeverHandlers'; // Updated import
import { humanReadableDate } from '../utils/generalUtils';

export const getRiskLever = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskLeverHandler = await RiskLeverHandlers.create(data); // Updated handler name

    const id = req.params.id;
    if (!id) {
        res.send('Missing risk lever id').status(400);
        throw new Error('Missing risk lever id');
    }

    const riskLever = await riskLeverHandler.get({ id }); // Updated handler method

    res.respond({ data: riskLever });
});

export const getRiskLevers = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskLeverHandler = await RiskLeverHandlers.create(data); // Updated handler name
    console.log('Body', req.params);

    const queryParamObject: any = req.query ? {key_change_id: req.query.id}: {}
    const riskLevers = (await riskLeverHandler.getAll(queryParamObject)).map((dec, index) => {
        return {
            No: index + 1,
            created_at: humanReadableDate(dec.created_at?.toString()),
            ...dec,
        };
    });

    res.respond({ data: riskLevers });
});

export const addRiskLever = catchErrors(async (req, res) => {
    const riskLeverData = req.body;

    if (!riskLeverData) {
        res.status(400).send('Missing risk lever data');
        throw new Error('Missing risk lever data');
    }

    const data = await DataProvider.create();
    const riskLeverHandler = await RiskLeverHandlers.create(data); // Updated handler name

    const riskLever = await riskLeverHandler.insert(riskLeverData); // Updated handler method
    res.respond({ data: riskLever });
});

export const updateRiskLever = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskLeverHandler = await RiskLeverHandlers.create(data); // Updated handler name

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send('Missing risk lever id or update data').status(400);
        throw new Error('Missing risk lever id or update data');
    }

    const riskLever = await riskLeverHandler.update({ ...updateData, id }); // Updated handler method

    res.respond({ data: riskLever });
});

export const deleteRiskLever = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskLeverHandler = await RiskLeverHandlers.create(data); // Updated handler name

    const id = req.params.id;
    if (!id) {
        res.send('Missing risk lever id').status(400);
        throw new Error('Missing risk lever id');
    }

    await riskLeverHandler.deleteRiskLever({ id }); // Updated handler method

    res.respond({ message: 'Risk lever deleted successfully' });
});
