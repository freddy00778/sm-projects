import { catchErrors } from '../errors';
import DataProvider from '../data/DataProvider';
import RiskRatingHandlers from '../data/riskRating/RiskRatingHandlers'; // Updated import
import { humanReadableDate } from '../utils/generalUtils';

export const getRiskRating = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskRatingHandler = await RiskRatingHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send('Missing risk rating id').status(400);
        throw new Error('Missing risk rating id');
    }

    const riskRating = await riskRatingHandler.get({ id });
    res.respond({ data: riskRating });
});

export const getRiskRatings = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskRatingHandler = await RiskRatingHandlers.create(data);
    console.log('Body', req.params);

    const queryObject: any = req.query ? {key_change_id: req.query.id} : {}
    const risks = (await riskRatingHandler.getAll(queryObject))
    const riskRatings = risks?.map((dec, index) => {
        return {
            No: index + 1,
            created_at: humanReadableDate(dec.created_at?.toString()),
            ...dec,
        };
    });

    res.respond({ data: riskRatings });
});

export const addRiskRating = catchErrors(async (req, res) => {
    const riskRatingData = req.body;

    if (!riskRatingData) {
        res.status(400).send('Missing risk rating data');
        throw new Error('Missing risk rating data');
    }

    const data = await DataProvider.create();
    const riskRatingHandler = await RiskRatingHandlers.create(data)
    const exists = await riskRatingHandler.get({key_change_id: req.body.key_change_id})
    let riskRating;

    console.log("Exists", exists)

    if (exists){
        await riskRatingHandler.update({
            id: exists?.id,
            ...req.body
        })
    }else{
         riskRating = await riskRatingHandler.insert(riskRatingData);
    }

    res.respond({ data: riskRating });
});

export const updateRiskRating = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskRatingHandler = await RiskRatingHandlers.create(data);

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send('Missing risk rating id or update data').status(400);
        throw new Error('Missing risk rating id or update data');
    }

    const riskRating = await riskRatingHandler.update({ ...updateData, id });
    res.respond({ data: riskRating });
});

export const deleteRiskRating = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const riskRatingHandler = await RiskRatingHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send('Missing risk rating id').status(400);
        throw new Error('Missing risk rating id');
    }

    await riskRatingHandler.deleteRiskRating({ id });
    res.respond({ message: 'Risk rating deleted successfully' });
});
