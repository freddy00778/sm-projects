import {DataClient} from '../index'
import UserController, {Controller} from './ScopeController'
import {GetInput} from "./ScopeData";


export const get = (projects: Controller) => async (input: GetInput) => {
    return projects.get(input)
}

export const getAll = (scopes: Controller) => async (input: GetInput) => {
    return scopes.getAll(input)
}

export const update = (scopes: Controller) => async (input: GetInput) => {
    return scopes.update(input)
}

export const insert = (scopes: Controller) => async (input: GetInput) => {
    return scopes.insert(input)
}

export const deleteScope = (scopes: Controller) => async (input: GetInput) => {
    return scopes.deleteScope(input)
}

export async function create (data: DataClient) {
    const scopes = await UserController.create(data)

    return {
        get: get(scopes),
        getAll: getAll(scopes),
        update: update(scopes),
        insert: insert(scopes),
        deleteScope: deleteScope(scopes)
    }
}

export default {create}