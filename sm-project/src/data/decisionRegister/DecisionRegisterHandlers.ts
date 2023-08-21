import {DataClient} from '../index'
import UserController, {Controller} from './DecisionRegisterController'
import {GetInput} from "./DecisionRegisterData";


export const get = (decisions: Controller) => async (input: GetInput) => {
    return decisions.get(input)
}

export const getAll = (decisions: Controller) => async (input?: GetInput) => {
    return decisions.getAll(input)
}

export const update = (decisions: Controller) => async (input: GetInput) => {
    return decisions.update(input)
}

export const insert = (decisions: Controller) => async (input: GetInput) => {
    return decisions.insert(input)
}

export const deleteRegister = (decisions: Controller) => async (input: GetInput) => {
    return decisions.deleteDecision(input)
}

export async function create (data: DataClient) {
    const decisions = await UserController.create(data)

    return {
        get: get(decisions),
        getAll: getAll(decisions),
        update: update(decisions),
        insert: insert(decisions),
        deleteRegister: deleteRegister(decisions)
    }
}

export default {create}