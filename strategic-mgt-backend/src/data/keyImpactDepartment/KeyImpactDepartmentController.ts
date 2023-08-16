import KeyImpactDepartmentData , {Data, GetInput} from './KeyImpactDepartmentData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteKeyImpactDepartment: ReturnType<typeof deleteKeyImpactDepartment>,
}

export const get = (keyImpactDepartments: Data) => async (input: GetInput) => {
    return keyImpactDepartments.get(input);
}

export const getAll = (keyImpactDepartments: Data) => async (input: GetInput) => {
    return keyImpactDepartments.getAll(input);
}

export const update = (keyImpactDepartments: Data) => async (input: GetInput) => {
    return keyImpactDepartments.update(input);
}

export const insert = (keyImpactDepartments: Data) => async (input: GetInput) => {
    return keyImpactDepartments.insert(input);
}

export const deleteKeyImpactDepartment = (keyImpactDepartments: Data) => async (input: GetInput) => {
    return keyImpactDepartments.deleteKeyImpactDepartment(input);
}

export async function create (data: DataClient): Promise<Controller> {
    const keyImpactDepartments = await KeyImpactDepartmentData.create(data);

    return {
        get: get(keyImpactDepartments),
        getAll: getAll(keyImpactDepartments),
        update: update(keyImpactDepartments),
        insert: insert(keyImpactDepartments),
        deleteKeyImpactDepartment: deleteKeyImpactDepartment(keyImpactDepartments),
    };
}

export default {create};
