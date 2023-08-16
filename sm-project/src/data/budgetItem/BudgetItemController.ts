import BudgetItemData , {Data, GetInput} from './BudgetItemData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteBudgetItem: ReturnType<typeof deleteBudgetItem>,
}

export const get = (budgetItems: Data) => async (input: GetInput) => {
    return budgetItems.get(input)
}

export const getAll = (budgetItems: Data) => async (input: GetInput) => {
    return budgetItems.getAll(input)
}

export const update = (budgetItems: Data) => async (input: GetInput) => {
    return budgetItems.update(input)
}

export const insert = (budgetItems: Data) => async (input: GetInput) => {
    return budgetItems.insert(input)
}

export const deleteBudgetItem = (budgetItems: Data) => async (input: GetInput) => {
    return budgetItems.deleteBudgetItem(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const budgetItems = await BudgetItemData.create(data)

    return {
        get: get(budgetItems),
        getAll: getAll(budgetItems),
        update: update(budgetItems),
        insert: insert(budgetItems),
        deleteBudgetItem: deleteBudgetItem(budgetItems),
    }
}

export default {create}
