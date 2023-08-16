import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import RiskObstacleHandlers from "../data/riskObstacle/RiskObstacleHandlers";
import {humanReadableDate} from "../utils/generalUtils";

export const getRiskObstacle = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskObstacleHandler = await RiskObstacleHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing risk obstacle id").status(400)
        throw new Error('Missing risk obstacle id');
    }

    const riskObstacle = await riskObstacleHandler.get({ id })

    res.respond({  data: riskObstacle });
});

export const getRiskObstacles = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskObstacleHandler = await RiskObstacleHandlers.create(data)
    console.log("Body", req.params)

    const riskObstacles = (await riskObstacleHandler.getAll({})).map((dec, index) => {
        return {
            No: index+1,
            created_at: humanReadableDate(dec.created_at?.toString()),
            ...dec
        }
    })

    res.respond({  data: riskObstacles });
});

export const addRiskObstacle = catchErrors(async (req, res) => {
    const riskObstacleData = req.body;

    if (!riskObstacleData) {
        res.status(400).send("Missing risk obstacle data");
        throw new Error('Missing risk obstacle data');
    }

    const data = await DataProvider.create();
    const riskObstacleHandler = await RiskObstacleHandlers.create(data);

    const riskObstacle = await riskObstacleHandler.insert(riskObstacleData);
    res.respond({ data: riskObstacle });
})

export const updateRiskObstacle = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskObstacleHandler = await RiskObstacleHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing risk obstacle id or update data").status(400)
        throw new Error('Missing risk obstacle id or update data');
    }

    const riskObstacle = await riskObstacleHandler.update({ ...updateData, id })

    res.respond({ data: riskObstacle });
});

export const deleteRiskObstacle = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const riskObstacleHandler = await RiskObstacleHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing risk obstacle id").status(400)
        throw new Error('Missing risk obstacle id');
    }

    await riskObstacleHandler.deleteRiskObstacle({ id })

    res.respond({ message: 'Risk obstacle deleted successfully' });
});
