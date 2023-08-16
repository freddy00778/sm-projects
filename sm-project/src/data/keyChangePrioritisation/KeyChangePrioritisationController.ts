import KeyChangePrioritisationData, { DataPrioritisation, GetInput } from './KeyChangePrioritisationData';
import { DataClient } from '../index';

export interface Controller {
    get: ReturnType<typeof get>;
    getAll: ReturnType<typeof getAll>;
    update: ReturnType<typeof update>;
    insert: ReturnType<typeof insert>;
    deletePrioritisation: ReturnType<typeof deletePrioritisation>;
}

export const get = (keyChangePrioritisations: DataPrioritisation) => async (input: GetInput) => {
    return keyChangePrioritisations.get(input);
};

export const getAll = (keyChangePrioritisations: DataPrioritisation) => async (input: GetInput) => {
    return keyChangePrioritisations.getAll(input);
};

export const update = (keyChangePrioritisations: DataPrioritisation) => async (input: GetInput) => {
    return keyChangePrioritisations.update(input);
};

export const insert = (keyChangePrioritisations: DataPrioritisation) => async (input: GetInput) => {
    return keyChangePrioritisations.insert(input);
};

export const deletePrioritisation = (keyChangePrioritisations: DataPrioritisation) => async (input: GetInput) => {
    return keyChangePrioritisations.deletePrioritisation(input);
};

export async function create(data: DataClient): Promise<Controller> {
    const keyChangePrioritisations = await KeyChangePrioritisationData.create(data);

    return {
        get: get(keyChangePrioritisations),
        getAll: getAll(keyChangePrioritisations),
        update: update(keyChangePrioritisations),
        insert: insert(keyChangePrioritisations),
        deletePrioritisation: deletePrioritisation(keyChangePrioritisations),
    };
}

export default { create };
