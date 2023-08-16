import {DataClient} from '../index'
import BudgetItemController, {Controller} from './BudgetItemController'
import  {GetInput} from "./BudgetItemData";

export const get = (budgetItem: Controller) => async (input: GetInput) => {
    return budgetItem.get(input)
}

export const getAll = (budgetItem: Controller) => async (input: GetInput) => {
    return budgetItem.getAll(input)
}

export const update = (budgetItem: Controller) => async (input: GetInput) => {
    return budgetItem.update(input)
}

export const insert = (budgetItem: Controller) => async (input: GetInput) => {
    return budgetItem.insert(input)
}

export const deleteBudgetItem = (budgetItem: Controller) => async (input: GetInput) => {
    return budgetItem.deleteBudgetItem(input)
}

export async function create (data: DataClient) {
    const budgetItems = await BudgetItemController.create(data)

    return {
        get:            get(budgetItems),
        getAll:         getAll(budgetItems),
        update:         update(budgetItems),
        insert:         insert(budgetItems),
        deleteBudgetItem: deleteBudgetItem(budgetItems)
    }
}

export default {create}
