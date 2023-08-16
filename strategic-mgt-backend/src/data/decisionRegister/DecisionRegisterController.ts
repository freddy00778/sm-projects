import UserData, {Data, GetInput} from './DecisionRegisterData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteDecision: ReturnType<typeof deleteDecision>,
}

export const get = (decisions: Data) => async (input: GetInput) => {
    return decisions.get(input)
}

export const getAll = (decisions: Data) => async (input?: GetInput) => {
    return decisions.getAll(input)
}

export const update = (decisions: Data) => async (input: GetInput) => {
    return decisions.update(input)
}

export const insert = (decisions: Data) => async (input: GetInput) => {
    return decisions.insert(input)
}

export const deleteDecision = (decisions: Data) => async (input: GetInput) => {
    return decisions.deleteScope(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const scopes = await UserData.create(data)

    return {
        get: get(scopes),
        getAll: getAll(scopes),
        update: update(scopes),
        insert: insert(scopes),
        deleteDecision: deleteDecision(scopes),
    }
}

export default {create}