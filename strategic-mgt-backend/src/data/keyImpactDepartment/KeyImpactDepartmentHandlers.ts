import {DataClient} from '../index'
import KeyImpactDepartmentController, {Controller} from './KeyImpactDepartmentController'
import {GetInput} from "./KeyImpactDepartmentData";

export const get = (keyImpactDepartment: Controller) => async (input: GetInput) => {
    return keyImpactDepartment.get(input);
}

export const getAll = (keyImpactDepartment: Controller) => async (input: GetInput) => {
    return keyImpactDepartment.getAll(input);
}

export const update = (keyImpactDepartment: Controller) => async (input: GetInput) => {
    return keyImpactDepartment.update(input);
}

export const insert = (keyImpactDepartment: Controller) => async (input: GetInput) => {
    return keyImpactDepartment.insert(input);
}

export const deleteKeyImpactDepartment = (keyImpactDepartment: Controller) => async (input: GetInput) => {
    return keyImpactDepartment.deleteKeyImpactDepartment(input);
}

export async function create (data: DataClient) {
    const keyImpactDepartments = await KeyImpactDepartmentController.create(data);

    return {
        get: get(keyImpactDepartments),
        getAll: getAll(keyImpactDepartments),
        update: update(keyImpactDepartments),
        insert: insert(keyImpactDepartments),
        deleteKeyImpactDepartment: deleteKeyImpactDepartment(keyImpactDepartments),
    };
}

export default {create};
