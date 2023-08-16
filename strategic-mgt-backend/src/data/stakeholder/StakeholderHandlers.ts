import {DataClient} from '../index'
import StakeholderController, {Controller} from './StakeholderController'
import  {GetInput} from "./StakeholderData";

export const get = (stakeholder: Controller) => async (input: GetInput) => {
    return stakeholder.get(input)
}

export const getAll = (stakeholder: Controller) => async (input: GetInput) => {
    return stakeholder.getAll(input)
}

export const update = (stakeholder: Controller) => async (input: GetInput) => {
    return stakeholder.update(input)
}

export const insert = (stakeholder: Controller) => async (input: GetInput) => {
    return stakeholder.insert(input)
}

export const deleteStakeholder = (stakeholder: Controller) => async (input: GetInput) => {
    return stakeholder.deleteStakeholder(input)
}

export async function create (data: DataClient) {
    const stakeholders = await StakeholderController.create(data)

    return {
        get:            get(stakeholders),
        getAll:         getAll(stakeholders),
        update:         update(stakeholders),
        insert:         insert(stakeholders),
        deleteStakeholder: deleteStakeholder(stakeholders)
    }
}

export default {create}
