import { DataClient } from '../index';
import RiskRatingController, { Controller } from './RiskRatingController'; // Updated import
import { GetInput } from "./RiskRatingData"; // Updated import

export const get = (riskRatings: Controller) => async (input: GetInput) => {
    return riskRatings.get(input);
}

export const getAll = (riskRatings: Controller) => async (input: GetInput) => {
    return riskRatings.getAll(input);
}

export const update = (riskRatings: Controller) => async (input: GetInput) => {
    return riskRatings.update(input);
}

export const insert = (riskRatings: Controller) => async (input: GetInput) => {
    return riskRatings.insert(input);
}

export const deleteRiskRating = (riskRatings: Controller) => async (input: GetInput) => { // Updated function name
    return riskRatings.deleteRiskRating(input); // Updated method name
}

export async function create(data: DataClient) {
    const riskRatings = await RiskRatingController.create(data);

    return {
        get: get(riskRatings),
        getAll: getAll(riskRatings),
        update: update(riskRatings),
        insert: insert(riskRatings),
        deleteRiskRating: deleteRiskRating(riskRatings)
    }
}

export default { create };
