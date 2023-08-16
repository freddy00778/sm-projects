import HighLevelPlanData, {Data, GetInput} from './HighLevelPlanData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deletePlan: ReturnType<typeof deletePlan>,
}

export const get = (plans: Data) => async (input: GetInput) => {
    return plans.get(input)
}

export const getAll = (plans: Data) => async (input: GetInput) => {
    return plans.getAll(input)
}

export const update = (plans: Data) => async (input: GetInput) => {
    return plans.update(input)
}

export const insert = (plans: Data) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deletePlan = (projects: Data) => async (input: GetInput) => {
    return projects.deletePlans(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const plans = await HighLevelPlanData.create(data)

    return {
        get:        get(plans),
        getAll:     getAll(plans),
        update:     update(plans),
        insert:     insert(plans),
        deletePlan: deletePlan(plans),
    }
}

export default {create}