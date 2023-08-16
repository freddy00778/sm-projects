import UserData, {Data, GetInput} from './CategoryData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteCategory: ReturnType<typeof deleteCategory>,
}

export const get = (categories: Data) => async (input: GetInput) => {
    return categories.get(input)
}

export const getAll = (categories: Data) => async (input: GetInput) => {
    return categories.getAll(input)
}

export const update = (categories: Data) => async (input: GetInput) => {
    return categories.update(input)
}

export const insert = (categories: Data) => async (input: GetInput) => {
    return categories.insert(input)
}

export const deleteCategory = (categories: Data) => async (input: GetInput) => {
    return categories.deleteCategory(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const scopes = await UserData.create(data)

    return {
        get: get(scopes),
        getAll: getAll(scopes),
        update: update(scopes),
        insert: insert(scopes),
        deleteCategory: deleteCategory(scopes),
    }
}

export default {create}