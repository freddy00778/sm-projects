import { DataClient } from '../index';
import RiskLeverController, { Controller } from './RiskLeverController'; // Changed import
import { GetInput } from "./RiskLeverData"; // Changed import

export const get = (riskLevers: Controller) => async (input: GetInput) => { // Changed function name and argument
    return riskLevers.get(input);
}

export const getAll = (riskLevers: Controller) => async (input: GetInput) => { // Changed function name and argument
    return riskLevers.getAll(input);
}

export const update = (riskLevers: Controller) => async (input: GetInput) => { // Changed function name and argument
    return riskLevers.update(input);
}

export const insert = (riskLevers: Controller) => async (input: GetInput) => { // Changed function name and argument
    return riskLevers.insert(input);
}

export const deleteRiskLever = (riskLevers: Controller) => async (input: GetInput) => { // Changed function name and argument
    return riskLevers.deleteRiskLever(input);
}

export async function create(data: DataClient) {
    const riskLevers = await RiskLeverController.create(data); // Changed function name

    return {
        get: get(riskLevers),
        getAll: getAll(riskLevers),
        update: update(riskLevers),
        insert: insert(riskLevers),
        deleteRiskLever: deleteRiskLever(riskLevers)
    }
}

export default { create };
