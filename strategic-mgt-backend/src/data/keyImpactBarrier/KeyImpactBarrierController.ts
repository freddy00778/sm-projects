import KeyImpactBarrierData, { Data, GetInput } from './KeyImpactBarrierData';
import { DataClient } from '../index';

export interface Controller {
    get: ReturnType<typeof get>;
    getAll: ReturnType<typeof getAll>;
    update: ReturnType<typeof update>;
    insert: ReturnType<typeof insert>;
    deleteBarrier: ReturnType<typeof deleteBarrier>;
}

export const get = (barriers: Data) => async (input: GetInput) => {
    return barriers.get(input);
}

export const getAll = (barriers: Data) => async (input?: GetInput) => {
    return barriers.getAll(input);
}

export const update = (barriers: Data) => async (input: GetInput) => {
    return barriers.update(input);
}

export const insert = (barriers: Data) => async (input: GetInput) => {
    return barriers.insert(input);
}

export const deleteBarrier = (barriers: Data) => async (input: GetInput) => {
    return barriers.deleteKeyImpactBarrier(input);  // make sure the method name is changed in the original data file
}

export async function create(data: DataClient): Promise<Controller> {
    const keyImpactBarrier = await KeyImpactBarrierData.create(data);

    return {
        get: get(keyImpactBarrier),
        getAll: getAll(keyImpactBarrier),
        update: update(keyImpactBarrier),
        insert: insert(keyImpactBarrier),
        deleteBarrier: deleteBarrier(keyImpactBarrier),
    }
}

export default { create };
