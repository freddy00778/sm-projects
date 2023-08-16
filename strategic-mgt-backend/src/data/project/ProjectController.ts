import UserData, {Data, GetInput} from './ProjectData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteProject: ReturnType<typeof deleteProject>,
}

export const get = (projects: Data) => async (input: GetInput) => {
    return projects.get(input)
}

export const getAll = (projects: Data) => async (input: GetInput) => {
    return projects.getAll(input)
}

export const update = (projects: Data) => async (input: GetInput) => {
    return projects.update(input)
}

export const insert = (projects: Data) => async (input: GetInput) => {
    return projects.insert(input)
}

export const deleteProject = (projects: Data) => async (input: GetInput) => {
    return projects.deleteProject(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const projects = await UserData.create(data)

    return {
        get: get(projects),
        getAll: getAll(projects),
        update: update(projects),
        insert: insert(projects),
        deleteProject: deleteProject(projects),
    }
}

export default {create}