import ChangeApproachData , {Data, GetInput} from './ChangeApproachData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteChangeApproach: ReturnType<typeof deleteChangeApproach>,
}

export const get = (changeApproaches: Data) => async (input: GetInput) => {
    return changeApproaches.get(input)
}

export const getAll = (changeApproaches: Data) => async (input: GetInput) => {
    return changeApproaches.getAll(input)
}

export const update = (changeApproaches: Data) => async (input: GetInput) => {
    return changeApproaches.update(input)
}

export const insert = (changeApproaches: Data) => async (input: GetInput) => {
    return changeApproaches.insert(input)
}

export const deleteChangeApproach = (changeApproaches: Data) => async (input: GetInput) => {
    return changeApproaches.deleteChangeApproach(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const changeApproaches = await ChangeApproachData.create(data)

    return {
        get: get(changeApproaches),
        getAll: getAll(changeApproaches),
        update: update(changeApproaches),
        insert: insert(changeApproaches),
        deleteChangeApproach: deleteChangeApproach(changeApproaches),
    }
}

export default {create}
