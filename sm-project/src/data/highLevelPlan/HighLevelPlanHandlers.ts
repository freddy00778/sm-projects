import {DataClient} from '../index'
import UserController, {Controller} from './HighLevelPlanController'
import {GetInput} from "./HighLevelPlanData";


export const get = (plans: Controller) => async (input: GetInput) => {
    return plans.get(input)
}

export const getAll = (plans: Controller) => async (input: GetInput) => {
    return plans.getAll(input)
}

export const update = (plans: Controller) => async (input: GetInput) => {
    return plans.update(input)
}

export const insert = (plans: Controller) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deletePlan = (plans: Controller) => async (input: GetInput) => {
    return plans.deletePlan(input)
}

export async function create (data: DataClient) {
    const projects = await UserController.create(data)

    return {
        get: get(projects),
        getAll: getAll(projects),
        update: update(projects),
        insert: insert(projects),
        deletePlan: deletePlan(projects)
    }
}

export default {create}