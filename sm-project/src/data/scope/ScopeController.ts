import UserData, {Data, GetInput} from './ScopeData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteScope: ReturnType<typeof deleteScope>,
}

export const get = (scopes: Data) => async (input: GetInput) => {
    return scopes.get(input)
}

export const getAll = (scopes: Data) => async (input: GetInput) => {
    return scopes.getAll(input)
}

export const update = (scopes: Data) => async (input: GetInput) => {
    return scopes.update(input)
}

export const insert = (scopes: Data) => async (input: GetInput) => {
    return scopes.insert(input)
}

export const deleteScope = (scopes: Data) => async (input: GetInput) => {
    return scopes.deleteScope(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const scopes = await UserData.create(data)

    return {
        get: get(scopes),
        getAll: getAll(scopes),
        update: update(scopes),
        insert: insert(scopes),
        deleteScope: deleteScope(scopes),
    }
}

export default {create}