import {DataClient} from '../index'
import UserController, {Controller} from './UserController'
import {GetInput} from "./UserData";


export const get = (users: Controller) => async (input: GetInput) => {
    return users.get(input)
}

export const getAll = (users: Controller) => async (input: GetInput) => {
    return users.getAll(input)
}

export const update = (roles: Controller) => async (input: GetInput) => {
    return roles.update(input)
}

export const insert = (roles: Controller) => async (input: GetInput) => {
    return roles.insert(input)
}

export const deleteUser = (roles: Controller) => async (input: GetInput) => {
    return roles.deleteUser(input)
}

export async function create (data: DataClient) {
    const users = await UserController.create(data)

    return {
        get: get(users),
        getAll: getAll(users),
        update: update(users),
        insert: insert(users),
        deleteUser: deleteUser(users)
    }
}

export default {create}