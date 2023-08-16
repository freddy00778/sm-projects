import KeyChangeDepartmentData , {Data, GetInput} from './KeyChangeDepartmentData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteKeyChangeDepartment: ReturnType<typeof deleteKeyChangeDepartment>,
}

export const get = (keyChangeDepartments: Data) => async (input: GetInput) => {
    return keyChangeDepartments.get(input);
}

export const getAll = (keyChangeDepartments: Data) => async (input: GetInput) => {
    return keyChangeDepartments.getAll(input);
}

export const update = (keyChangeDepartments: Data) => async (input: GetInput) => {
    return keyChangeDepartments.update(input);
}

export const insert = (keyChangeDepartments: Data) => async (input: GetInput) => {
    return keyChangeDepartments.insert(input);
}

export const deleteKeyChangeDepartment = (keyChangeDepartments: Data) => async (input: GetInput) => {
    return keyChangeDepartments.deleteKeyChangeDepartment(input);
}

export async function create (data: DataClient): Promise<Controller> {
    const keyChangeDepartments = await KeyChangeDepartmentData.create(data);

    return {
        get: get(keyChangeDepartments),
        getAll: getAll(keyChangeDepartments),
        update: update(keyChangeDepartments),
        insert: insert(keyChangeDepartments),
        deleteKeyChangeDepartment: deleteKeyChangeDepartment(keyChangeDepartments),
    };
}

export default {create};
