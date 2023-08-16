import BudgetData , {Data, GetInput} from './BudgetData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteBudget: ReturnType<typeof deleteBudget>,
}

export const get = (budgets: Data) => async (input: GetInput) => {
    return budgets.get(input)
}

export const getAll = (budgets: Data) => async (input: GetInput) => {
    return budgets.getAll(input)
}

export const update = (budgets: Data) => async (input: GetInput) => {
    return budgets.update(input)
}

export const insert = (budgets: Data) => async (input: GetInput) => {
    return budgets.insert(input)
}

export const deleteBudget = (budgets: Data) => async (input: GetInput) => {
    return budgets.deleteBudget(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const budgets = await BudgetData.create(data)

    return {
        get: get(budgets),
        getAll: getAll(budgets),
        update: update(budgets),
        insert: insert(budgets),
        deleteBudget: deleteBudget(budgets),
    }
}

export default {create}
