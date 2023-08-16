import RoleData , {Data, GetInput} from './UserData'
import {DataClient} from '../index'


export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteUser: ReturnType<typeof deleteUser>,
}

export const get = (users: Data) => async (input: GetInput) => {
    return users.get(input)
}

export const getAll = (users: Data) => async (input: GetInput) => {
    return users.getAll(input)
}

export const update = (users: Data) => async (input: GetInput) => {
    return users.update(input)
}

export const insert = (plans: Data) => async (input: GetInput) => {
    return plans.insert(input)
}

export const deleteUser = (users: Data) => async (input: GetInput) => {
    return users.deleteUser(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const users = await RoleData.create(data)

    return {
        get:        get(users),
        getAll:     getAll(users),
        update:     update(users),
        insert:     insert(users),
        deleteUser: deleteUser(users),
    }
}

export default {create}