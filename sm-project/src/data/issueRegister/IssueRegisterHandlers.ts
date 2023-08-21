import {DataClient} from '../index'
import IssueController, {Controller} from './IssueRegisterController'
import {GetInput} from "./IssueRegisterData";


export const get = (issues: Controller) => async (input: GetInput) => {
    return issues.get(input)
}

export const getAll = (issues: Controller) => async (input?: GetInput) => {
    return issues.getAll(input)
}

export const groupedByIssueImpactLevel = (issues: Controller) => async (project_id: string) => {
    return issues.groupedByIssueImpactLevel(project_id)
}

export const update = (issues: Controller) => async (input: GetInput) => {
    return issues.update(input)
}

export const insert = (issues: Controller) => async (input: GetInput) => {
    return issues.insert(input)
}

export const deleteRegister = (issues: Controller) => async (input: GetInput) => {
    return issues.deleteIssue(input)
}

export async function create (data: DataClient) {
    const issueRegister = await IssueController.create(data)

    return {
        get: get(issueRegister),
        getAll: getAll(issueRegister),
        update: update(issueRegister),
        insert: insert(issueRegister),
        deleteRegister: deleteRegister(issueRegister),
        groupedByIssueImpactLevel: groupedByIssueImpactLevel(issueRegister)
    }
}

export default {create}
