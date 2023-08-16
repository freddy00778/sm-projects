import ObjectiveData , {Data, GetInput} from './ObjectiveData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteObjective: ReturnType<typeof deleteObjective>,
}

export const get = (objectives: Data) => async (input: GetInput) => {
    return objectives.get(input)
}

export const getAll = (objectives: Data) => async (input: GetInput) => {
    return objectives.getAll(input)
}

export const update = (objectives: Data) => async (input: GetInput) => {
    return objectives.update(input)
}

export const insert = (objectives: Data) => async (input: GetInput) => {
    return objectives.insert(input)
}

export const deleteObjective = (objectives: Data) => async (input: GetInput) => {
    return objectives.deleteObjective(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const objectives = await ObjectiveData.create(data)

    return {
        get: get(objectives),
        getAll: getAll(objectives),
        update: update(objectives),
        insert: insert(objectives),
        deleteObjective: deleteObjective(objectives),
    }
}

export default {create}
