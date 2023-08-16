import { DataClient } from '../index';
import StakeholderChangeDriverController, { Controller } from './StakeholderChangeDriverController';
import { GetInput } from "./StakeholderChangeDriverData";

export const get = (stakeholderChangeDriver: Controller) => async (input: GetInput) => {
    return stakeholderChangeDriver.get(input);
};

export const getAll = (stakeholderChangeDriver: Controller) => async (input: GetInput) => {
    return stakeholderChangeDriver.getAll(input);
};

export const update = (stakeholderChangeDriver: Controller) => async (input: GetInput) => {
    return stakeholderChangeDriver.update(input);
};

export const insert = (stakeholderChangeDriver: Controller) => async (input: GetInput) => {
    return stakeholderChangeDriver.insert(input);
};

export const deleteChangeDriver = (stakeholderChangeDriver: Controller) => async (input: GetInput) => {
    return stakeholderChangeDriver.deleteChangeDriver(input); // Consider renaming this in the original Controller if it's specific to StakeholderChangeDriver
};

export async function create(data: DataClient) {
    const stakeholderChangeDrivers = await StakeholderChangeDriverController.create(data);

    return {
        get: get(stakeholderChangeDrivers),
        getAll: getAll(stakeholderChangeDrivers),
        update: update(stakeholderChangeDrivers),
        insert: insert(stakeholderChangeDrivers),
        deleteChangeDriver: deleteChangeDriver(stakeholderChangeDrivers),
    };
}

export default { create };
