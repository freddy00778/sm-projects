import IssueRegisterData, {Data, GetInput} from './IssueRegisterData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteIssue: ReturnType<typeof deleteIssue>,
}

export const get = (issues: Data) => async (input: GetInput) => {
    return issues.get(input)
}

export const getAll = (issues: Data) => async (input?: GetInput) => {
    return issues.getAll(input)
}

export const update = (issues: Data) => async (input: GetInput) => {
    return issues.update(input)
}

export const insert = (issues: Data) => async (input: GetInput) => {
    return issues.insert(input)
}

export const deleteIssue = (issues: Data) => async (input: GetInput) => {
    return issues.deleteIssueRegister(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const issueRegister = await IssueRegisterData.create(data)

    return {
        get: get(issueRegister),
        getAll: getAll(issueRegister),
        update: update(issueRegister),
        insert: insert(issueRegister),
        deleteIssue: deleteIssue(issueRegister),
    }
}

export default {create}
