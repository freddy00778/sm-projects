import {DataClient} from '../index'
import UserController, {Controller} from './RoleController'
import {GetInput} from "./RoleData";


export const get = (roles: Controller) => async (input: GetInput) => {
    return roles.get(input)
}

export const getAll = (roles: Controller) => async (input: GetInput) => {
    return roles.getAll(input)
}

export const update = (roles: Controller) => async (input: GetInput) => {
    return roles.update(input)
}

export const insert = (roles: Controller) => async (input: GetInput) => {
    return roles.insert(input)
}

export const deleteRole = (roles: Controller) => async (input: GetInput) => {
    return roles.deleteRole(input)
}

export async function create (data: DataClient) {
    const roles = await UserController.create(data)

    return {
        get: get(roles),
        getAll: getAll(roles),
        update: update(roles),
        insert: insert(roles),
        deleteRole: deleteRole(roles)
    }
}

export default {create}