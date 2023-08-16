import {DataClient} from '../index'
import KeyChangeDepartmentController, {Controller} from './KeyChangeDepartmentController'
import  {GetInput} from "./KeyChangeDepartmentData";

export const get = (keyChangeDepartment: Controller) => async (input: GetInput) => {
    return keyChangeDepartment.get(input);
}

export const getAll = (keyChangeDepartment: Controller) => async (input: GetInput) => {
    return keyChangeDepartment.getAll(input);
}

export const update = (keyChangeDepartment: Controller) => async (input: GetInput) => {
    return keyChangeDepartment.update(input);
}

export const insert = (keyChangeDepartment: Controller) => async (input: GetInput) => {
    return keyChangeDepartment.insert(input);
}

export const deleteKeyChangeDepartment = (keyChangeDepartment: Controller) => async (input: GetInput) => {
    return keyChangeDepartment.deleteKeyChangeDepartment(input);
}

export async function create (data: DataClient) {
    const keyChangeDepartments = await KeyChangeDepartmentController.create(data);

    return {
        get: get(keyChangeDepartments),
        getAll: getAll(keyChangeDepartments),
        update: update(keyChangeDepartments),
        insert: insert(keyChangeDepartments),
        deleteKeyChangeDepartment: deleteKeyChangeDepartment(keyChangeDepartments),
    };
}

export default {create};
