import {DataClient} from '../index'
import KeyImpactController, {Controller} from './KeyImpactController'
import  {GetInput} from "./KeyImpactData";

export const get = (keyImpact: Controller) => async (input: GetInput) => {
    return keyImpact.get(input);
}

export const getAll = (keyImpact: Controller) => async (input: GetInput) => {
    return keyImpact.getAll(input);
}

export const update = (keyImpact: Controller) => async (input: GetInput) => {
    return keyImpact.update(input);
}

export const insert = (keyImpact: Controller) => async (input: GetInput) => {
    return keyImpact.insert(input);
}

export const deleteKeyImpact = (keyImpact: Controller) => async (input: GetInput) => {
    return keyImpact.deleteKeyImpact(input);
}

export async function create (data: DataClient) {
    const keyImpacts = await KeyImpactController.create(data);

    return {
        get: get(keyImpacts),
        getAll: getAll(keyImpacts),
        update: update(keyImpacts),
        insert: insert(keyImpacts),
        deleteKeyImpact: deleteKeyImpact(keyImpacts),
    };
}

export default {create};
