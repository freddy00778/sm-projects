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
    const scopes = await UserController.create(data)

    return {
        get: get(scopes),
        getAll: getAll(scopes),
        update: update(scopes),
        insert: insert(scopes),
        deleteRegister: deleteRegister(scopes)
    }
}

export default {create}