import StakeholderChangeDriverData, { Data, GetInput } from './StakeholderChangeDriverData';
import { DataClient } from '../index';

export interface Controller {
    get: ReturnType<typeof get>;
    getAll: ReturnType<typeof getAll>;
    update: ReturnType<typeof update>;
    insert: ReturnType<typeof insert>;
    deleteChangeDriver: ReturnType<typeof deleteChangeDriver>;
}

export const get = (stakeholderChangeDrivers: Data) => async (input: GetInput) => {
    return stakeholderChangeDrivers.get(input);
};

export const getAll = (stakeholderChangeDrivers: Data) => async (input: GetInput) => {
    return stakeholderChangeDrivers.getAll(input);
};

export const update = (stakeholderChangeDrivers: Data) => async (input: GetInput) => {
    return stakeholderChangeDrivers.update(input);
};

export const insert = (stakeholderChangeDrivers: Data) => async (input: GetInput) => {
    return stakeholderChangeDrivers.insert(input);
};

export const deleteChangeDriver = (stakeholderChangeDrivers: Data) => async (input: GetInput) => {
    return stakeholderChangeDrivers.deleteStakeholderChangeDriver(input); // Rename the actual method if necessary in StakeholderChangeDriverData.
};

export async function create(data: DataClient): Promise<Controller> {
    const stakeholderChangeDrivers = await StakeholderChangeDriverData.create(data);

    return {
        get: get(stakeholderChangeDrivers),
        getAll: getAll(stakeholderChangeDrivers),
        update: update(stakeholderChangeDrivers),
        insert: insert(stakeholderChangeDrivers),
        deleteChangeDriver: deleteChangeDriver(stakeholderChangeDrivers),
    };
}

export default { create };
