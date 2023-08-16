import CaseForChangeData , {Data, GetInput} from './CaseForChangeData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteCaseForChange: ReturnType<typeof deleteCaseForChange>,
}

export const get = (caseForChange: Data) => async (input: GetInput) => {
    return caseForChange.get(input)
}

export const getAll = (caseForChange: Data) => async (input: GetInput) => {
    return caseForChange.getAll(input)
}

export const update = (caseForChange: Data) => async (input: GetInput) => {
    return caseForChange.update(input)
}

export const insert = (caseForChange: Data) => async (input: GetInput) => {
    return caseForChange.insert(input)
}

export const deleteCaseForChange = (caseForChange: Data) => async (input: GetInput) => {
    return caseForChange.deleteCaseForChange(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const caseForChange = await CaseForChangeData.create(data)

    return {
        get: get(caseForChange),
        getAll: getAll(caseForChange),
        update: update(caseForChange),
        insert: insert(caseForChange),
        deleteCaseForChange: deleteCaseForChange(caseForChange),
    }
}

export default {create}
