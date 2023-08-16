import { DataClient } from '../index';
import KeyChangePrioritisationController, { Controller } from './KeyChangePrioritisationController';
import { GetInput } from "./KeyChangePrioritisationData";

export const get = (keyChangePrioritisations: Controller) => async (input: GetInput) => {
    return keyChangePrioritisations.get(input);
}

export const getAll = (keyChangePrioritisations: Controller) => async (input: GetInput) => {
    return keyChangePrioritisations.getAll(input);
}

export const update = (keyChangePrioritisations: Controller) => async (input: GetInput) => {
    return keyChangePrioritisations.update(input);
}

export const insert = (keyChangePrioritisations: Controller) => async (input: GetInput) => {
    return keyChangePrioritisations.insert(input);
}

export const deletePrioritisation = (keyChangePrioritisations: Controller) => async (input: GetInput) => {
    return keyChangePrioritisations.deletePrioritisation(input);
}

export async function create(data: DataClient) {
    const keyChangePrioritisations = await KeyChangePrioritisationController.create(data);

    return {
        get: get(keyChangePrioritisations),
        getAll: getAll(keyChangePrioritisations),
        update: update(keyChangePrioritisations),
        insert: insert(keyChangePrioritisations),
        deletePrioritisation: deletePrioritisation(keyChangePrioritisations)
    }
}

export default { create };
