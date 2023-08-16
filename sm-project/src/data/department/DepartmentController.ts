import DepartmentData , {Data, GetInput} from './DepartmentData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteDepartment: ReturnType<typeof deleteDepartment>,
}

export const get = (departments: Data) => async (input: GetInput) => {
    return departments.get(input)
}

export const getAll = (departments: Data) => async (input: GetInput) => {
    return departments.getAll(input)
}

export const update = (departments: Data) => async (input: GetInput) => {
    return departments.update(input)
}

export const insert = (departments: Data) => async (input: GetInput) => {
    return departments.insert(input)
}

export const deleteDepartment = (categories: Data) => async (input: GetInput) => {
    return categories.deleteDepartment(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const departments = await DepartmentData.create(data)

    return {
        get: get(departments),
        getAll: getAll(departments),
        update: update(departments),
        insert: insert(departments),
        deleteDepartment: deleteDepartment(departments),
    }
}

export default {create}