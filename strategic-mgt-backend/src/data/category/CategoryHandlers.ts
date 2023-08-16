import {DataClient} from '../index'
import UserController, {Controller} from './CategoryController'
import {GetInput} from "./CategoryData";


export const get = (category: Controller) => async (input: GetInput) => {
    return category.get(input)
}

export const getAll = (category: Controller) => async (input: GetInput) => {
    return category.getAll(input)
}

export const update = (category: Controller) => async (input: GetInput) => {
    return category.update(input)
}

export const insert = (category: Controller) => async (input: GetInput) => {
    return category.insert(input)
}

export const deleteCategory = (category: Controller) => async (input: GetInput) => {
    return category.deleteCategory(input)
}

export async function create (data: DataClient) {
    const categories = await UserController.create(data)

    return {
        get:            get(categories),
        getAll:         getAll(categories),
        update:         update(categories),
        insert:         insert(categories),
        deleteCategory: deleteCategory(categories)
    }
}

export default {create}