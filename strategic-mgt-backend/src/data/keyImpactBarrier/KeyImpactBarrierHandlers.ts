import { DataClient } from '../index';
import BarrierController, { Controller } from './KeyImpactBarrierController';
import { GetInput } from "./KeyImpactBarrierData";

export const get = (barriers: Controller) => async (input: GetInput) => {
    return barriers.get(input);
}

export const getAll = (barriers: Controller) => async (input?: GetInput) => {
    return barriers.getAll(input);
}

export const update = (barriers: Controller) => async (input: GetInput) => {
    return barriers.update(input);
}

export const insert = (barriers: Controller) => async (input: GetInput) => {
    return barriers.insert(input);
}

export const deleteBarrier = (barriers: Controller) => async (input: GetInput) => {
    return barriers.deleteBarrier(input);  // Assumed that you renamed `deleteIssue` to `deleteBarrier` in the controller.
}

export async function create(data: DataClient) {
    const keyImpactBarrier = await BarrierController.create(data);

    return {
        get: get(keyImpactBarrier),
        getAll: getAll(keyImpactBarrier),
        update: update(keyImpactBarrier),
        insert: insert(keyImpactBarrier),
        deleteBarrier: deleteBarrier(keyImpactBarrier),
    }
}

export default { create };
