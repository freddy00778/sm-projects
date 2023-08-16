import RiskRegisterData, {Data, GetInput} from './RiskRegisterData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteRisk: ReturnType<typeof deleteRisk>,
}

export const get = (risks: Data) => async (input: GetInput) => {
    return risks.get(input)
}

export const getAll = (risks: Data) => async (input?: GetInput) => {
    return risks.getAll(input)
}

export const update = (risks: Data) => async (input: GetInput) => {
    return risks.update(input)
}

export const insert = (risks: Data) => async (input: GetInput) => {
    return risks.insert(input)
}

export const deleteRisk = (risks: Data) => async (input: GetInput) => {
    return risks.deleteRiskRegister(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const riskRegister = await RiskRegisterData.create(data)

    return {
        get: get(riskRegister),
        getAll: getAll(riskRegister),
        update: update(riskRegister),
        insert: insert(riskRegister),
        deleteRisk: deleteRisk(riskRegister),
    }
}

export default {create}
