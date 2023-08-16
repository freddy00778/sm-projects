import {DataClient} from '../index'
import RiskController, {Controller} from './RiskRegisterController'
import {GetInput} from "./RiskRegisterData";


export const get = (risks: Controller) => async (input: GetInput) => {
    return risks.get(input)
}

export const getAll = (risks: Controller) => async (input?: GetInput) => {
    return risks.getAll(input)
}

export const update = (risks: Controller) => async (input: GetInput) => {
    return risks.update(input)
}

export const insert = (risks: Controller) => async (input: GetInput) => {
    return risks.insert(input)
}

export const deleteRegister = (risks: Controller) => async (input: GetInput) => {
    return risks.deleteRisk(input)
}

export async function create (data: DataClient) {
    const riskRegister = await RiskController.create(data)

    return {
        get: get(riskRegister),
        getAll: getAll(riskRegister),
        update: update(riskRegister),
        insert: insert(riskRegister),
        deleteRegister: deleteRegister(riskRegister),
    }
}

export default {create}
