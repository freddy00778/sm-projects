import KeyChangeData , {Data, GetInput} from './KeyChangeData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteKeyChange: ReturnType<typeof deleteKeyChange>,
}

export const get = (keyChanges: Data) => async (input: GetInput) => {
    return keyChanges.get(input)
}

export const getAll = (keyChanges: Data) => async (input: GetInput) => {
    return keyChanges.getAll(input)
}

export const update = (keyChanges: Data) => async (input: GetInput) => {
    return keyChanges.update(input)
}

export const insert = (keyChanges: Data) => async (input: GetInput) => {
    return keyChanges.insert(input)
}

export const deleteKeyChange = (keyChanges: Data) => async (input: GetInput) => {
    return keyChanges.deleteKeyChange(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const keyChanges = await KeyChangeData.create(data)

    return {
        get: get(keyChanges),
        getAll: getAll(keyChanges),
        update: update(keyChanges),
        insert: insert(keyChanges),
        deleteKeyChange: deleteKeyChange(keyChanges),
    }
}

export default {create}
