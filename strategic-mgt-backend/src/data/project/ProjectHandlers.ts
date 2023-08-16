import {DataClient} from '../index'
import UserController, {Controller} from './ProjectController'
import {GetInput} from "./ProjectData";


export const get = (projects: Controller) => async (input: GetInput) => {
    return projects.get(input)
}

export const getAll = (projects: Controller) => async (input: GetInput) => {
    return projects.getAll(input)
}

export const update = (projects: Controller) => async (input: GetInput) => {
    return projects.update(input)
}

export const insert = (projects: Controller) => async (input: GetInput) => {
    return projects.insert(input)
}

export const deleteProject = (projects: Controller) => async (input: GetInput) => {
    return projects.deleteProject(input)
}

export async function create (data: DataClient) {
    const projects = await UserController.create(data)

    return {
        get: get(projects),
        getAll: getAll(projects),
        update: update(projects),
        insert: insert(projects),
        deleteProject: deleteProject(projects)
    }
}

export default {create}