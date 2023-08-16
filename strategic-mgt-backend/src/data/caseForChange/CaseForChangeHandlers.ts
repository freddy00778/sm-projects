import {DataClient} from '../index'
import CaseForChangeController, {Controller} from './CaseForChangeController'
import  {GetInput} from "./CaseForChangeData";

export const get = (caseForChange: Controller) => async (input: GetInput) => {
    return caseForChange.get(input)
}

export const getAll = (caseForChange: Controller) => async (input: GetInput) => {
    return caseForChange.getAll(input)
}

export const update = (caseForChange: Controller) => async (input: GetInput) => {
    return caseForChange.update(input)
}

export const insert = (caseForChange: Controller) => async (input: GetInput) => {
    return caseForChange.insert(input)
}

export const deleteCaseForChange = (caseForChange: Controller) => async (input: GetInput) => {
    return caseForChange.deleteCaseForChange(input)
}

export async function create (data: DataClient) {
    const caseForChanges = await CaseForChangeController.create(data)

    return {
        get: get(caseForChanges),
        getAll: getAll(caseForChanges),
        update: update(caseForChanges),
        insert: insert(caseForChanges),
        deleteCaseForChange: deleteCaseForChange(caseForChanges)
    }
}

export default {create}
