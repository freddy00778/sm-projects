import {DataClient} from '../index'
import ObjectiveController, {Controller} from './ObjectiveController'
import  {GetInput} from "./ObjectiveData";

export const get = (objective: Controller) => async (input: GetInput) => {
    return objective.get(input)
}

export const getAll = (objective: Controller) => async (input: GetInput) => {
    return objective.getAll(input)
}

export const update = (objective: Controller) => async (input: GetInput) => {
    return objective.update(input)
}

export const insert = (objective: Controller) => async (input: GetInput) => {
    return objective.insert(input)
}

export const deleteObjective = (objective: Controller) => async (input: GetInput) => {
    return objective.deleteObjective(input)
}

export async function create (data: DataClient) {
    const objectives = await ObjectiveController.create(data)

    return {
        get:            get(objectives),
        getAll:         getAll(objectives),
        update:         update(objectives),
        insert:         insert(objectives),
        deleteObjective: deleteObjective(objectives)
    }
}

export default {create}
