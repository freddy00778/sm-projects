import RiskRatingData, { DataRating, GetInput } from './RiskRatingData';
import { DataClient } from '../index';

export interface Controller {
    get: ReturnType<typeof get>;
    getAll: ReturnType<typeof getAll>;
    update: ReturnType<typeof update>;
    insert: ReturnType<typeof insert>;
    deleteRiskRating: ReturnType<typeof deleteRiskRating>;
}

export const get = (riskRatings: DataRating) => async (input: GetInput) => {
    return riskRatings.get(input);
};

export const getAll = (riskRatings: DataRating) => async (input: GetInput) => {
    return riskRatings.getAll(input);
};

export const update = (riskRatings: DataRating) => async (input: GetInput) => {
    return riskRatings.update(input);
};

export const insert = (riskRatings: DataRating) => async (input: GetInput) => {
    return riskRatings.insert(input);
};

export const deleteRiskRating = (riskRatings: DataRating) => async (input: GetInput) => {
    return riskRatings.deleteRiskRating(input);
};

export async function create(data: DataClient): Promise<Controller> {
    const riskRatings = await RiskRatingData.create(data);

    return {
        get: get(riskRatings),
        getAll: getAll(riskRatings),
        update: update(riskRatings),
        insert: insert(riskRatings),
        deleteRiskRating: deleteRiskRating(riskRatings),
    };
}

export default { create };
