import IssueRegisterData, {Data, GetInput} from './IssueRegisterData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteIssue: ReturnType<typeof deleteIssue>,
    groupedByIssueImpactLevel: ReturnType<typeof groupedByIssueImpactLevel>,
}

export const get = (issues: Data) => async (input: GetInput) => {
    return issues.get(input)
}

export const getAll = (issues: Data) => async (input?: GetInput) => {
    return issues.getAll(input)
}

export const groupedByIssueImpactLevel = (issues: Data) => async (project_id: string) => {
    return issues.groupedByIssueImpactLevel(project_id)
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
        groupedByIssueImpactLevel: groupedByIssueImpactLevel(issueRegister),
    }
}

export default {create}
