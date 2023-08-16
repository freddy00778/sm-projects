import RiskLeverData, { DataLever, GetInput } from './RiskLeverData';
import { DataClient } from '../index';

export interface Controller {
    get: ReturnType<typeof get>;
    getAll: ReturnType<typeof getAll>;
    update: ReturnType<typeof update>;
    insert: ReturnType<typeof insert>;
    deleteRiskLever: ReturnType<typeof deleteRiskLever>;
}

export const get = (riskLevers: DataLever) => async (input: GetInput) => {
    return riskLevers.get(input);
};

export const getAll = (riskLevers: DataLever) => async (input: GetInput) => {
    return riskLevers.getAll(input);
};

export const update = (riskLevers: DataLever) => async (input: GetInput) => {
    return riskLevers.update(input);
};

export const insert = (riskLevers: DataLever) => async (input: GetInput) => {
    return riskLevers.insert(input);
};

export const deleteRiskLever = (riskLevers: DataLever) => async (input: GetInput) => {
    return riskLevers.deleteRiskLever(input);
};

export async function create(data: DataClient): Promise<Controller> {
    const riskLevers = await RiskLeverData.create(data);

    return {
        get: get(riskLevers),
        getAll: getAll(riskLevers),
        update: update(riskLevers),
        insert: insert(riskLevers),
        deleteRiskLever: deleteRiskLever(riskLevers),
    };
}

export default { create };
