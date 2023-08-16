import {DataClient} from '../index'
import ChangeApproachController, {Controller} from './ChangeApproachController'
import  {GetInput} from "./ChangeApproachData";

export const get = (changeApproach: Controller) => async (input: GetInput) => {
    return changeApproach.get(input)
}

export const getAll = (changeApproach: Controller) => async (input: GetInput) => {
    return changeApproach.getAll(input)
}

export const update = (changeApproach: Controller) => async (input: GetInput) => {
    return changeApproach.update(input)
}

export const insert = (changeApproach: Controller) => async (input: GetInput) => {
    return changeApproach.insert(input)
}

export const deleteChangeApproach = (changeApproach: Controller) => async (input: GetInput) => {
    return changeApproach.deleteChangeApproach(input)
}

export async function create (data: DataClient) {
    const changeApproaches = await ChangeApproachController.create(data)

    return {
        get:                get(changeApproaches),
        getAll:             getAll(changeApproaches),
        update:             update(changeApproaches),
        insert:             insert(changeApproaches),
        deleteChangeApproach: deleteChangeApproach(changeApproaches)
    }
}

export default {create}
