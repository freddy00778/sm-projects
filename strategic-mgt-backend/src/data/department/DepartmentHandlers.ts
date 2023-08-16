import {DataClient} from '../index'
import DepartmentController, {Controller} from './DepartmentController'
import  {GetInput} from "./DepartmentData";


export const get = (department: Controller) => async (input: GetInput) => {
    return department.get(input)
}

export const getAll = (department: Controller) => async (input: GetInput) => {
    return department.getAll(input)
}

export const update = (department: Controller) => async (input: GetInput) => {
    return department.update(input)
}

export const insert = (department: Controller) => async (input: GetInput) => {
    return department.insert(input)
}

export const deleteDepartment = (department: Controller) => async (input: GetInput) => {
    return department.deleteDepartment(input)
}

export async function create (data: DataClient) {
    const departments = await DepartmentController.create(data)

    return {
        get:            get(departments),
        getAll:         getAll(departments),
        update:         update(departments),
        insert:         insert(departments),
        deleteCategory: deleteDepartment(departments)
    }
}

export default {create}