import KeyImpactData, {Data, GetInput} from './KeyImpactData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteKeyImpact: ReturnType<typeof deleteKeyImpact>,
}

export const get = (keyImpacts: Data) => async (input: GetInput) => {
    return keyImpacts.get(input);
}

export const getAll = (keyImpacts: Data) => async (input: GetInput) => {
    return keyImpacts.getAll(input);
}

export const update = (keyImpacts: Data) => async (input: GetInput) => {
    return keyImpacts.update(input);
}

export const insert = (keyImpacts: Data) => async (input: GetInput) => {
    return keyImpacts.insert(input);
}

export const deleteKeyImpact = (keyImpacts: Data) => async (input: GetInput) => {
    return keyImpacts.deleteKeyImpact(input);
}

export async function create(data: DataClient): Promise<Controller> {
    const keyImpacts = await KeyImpactData.create(data);

    return {
        get: get(keyImpacts),
        getAll: getAll(keyImpacts),
        update: update(keyImpacts),
        insert: insert(keyImpacts),
        deleteKeyImpact: deleteKeyImpact(keyImpacts),
    };
}

export default {create};
