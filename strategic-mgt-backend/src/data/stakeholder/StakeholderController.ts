import StakeholderData , {Data, GetInput} from './StakeholderData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteStakeholder: ReturnType<typeof deleteStakeholder>,
}

export const get = (stakeholders: Data) => async (input: GetInput) => {
    return stakeholders.get(input)
}

export const getAll = (stakeholders: Data) => async (input: GetInput) => {
    return stakeholders.getAll(input)
}

export const update = (stakeholders: Data) => async (input: GetInput) => {
    return stakeholders.update(input)
}

export const insert = (stakeholders: Data) => async (input: GetInput) => {
    return stakeholders.insert(input)
}

export const deleteStakeholder = (stakeholders: Data) => async (input: GetInput) => {
    return stakeholders.deleteStakeholder(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const stakeholders = await StakeholderData.create(data)

    return {
        get: get(stakeholders),
        getAll: getAll(stakeholders),
        update: update(stakeholders),
        insert: insert(stakeholders),
        deleteStakeholder: deleteStakeholder(stakeholders),
    }
}

export default {create}
