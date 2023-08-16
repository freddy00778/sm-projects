import RoleData , {Data, GetInput} from './RoleData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteRole: ReturnType<typeof deleteRole>,
}

export const get = (roles: Data) => async (input: GetInput) => {
    return roles.get(input)
}

export const getAll = (roles: Data) => async (input: GetInput) => {
    return roles.getAll(input)
}

export const update = (plans: Data) => async (input: GetInput) => {
    return plans.update(input)
}

export const insert = (plans: Data) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deleteRole = (roles: Data) => async (input: GetInput) => {
    return roles.deleteRole(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const roles = await RoleData.create(data)

    return {
        get:        get(roles),
        getAll:     getAll(roles),
        update:     update(roles),
        insert:     insert(roles),
        deleteRole: deleteRole(roles),
    }
}

export default {create}