import {DataClient} from '../index'
import KeyChangeController, {Controller} from './KeyChangeController'
import  {GetInput} from "./KeyChangeData";

export const get = (keyChange: Controller) => async (input: GetInput) => {
    return keyChange.get(input)
}

export const getAll = (keyChange: Controller) => async (input: GetInput) => {
    return keyChange.getAll(input)
}

export const update = (keyChange: Controller) => async (input: GetInput) => {
    return keyChange.update(input)
}

export const insert = (keyChange: Controller) => async (input: GetInput) => {
    return keyChange.insert(input)
}

export const deleteKeyChange = (keyChange: Controller) => async (input: GetInput) => {
    return keyChange.deleteKeyChange(input)
}

export async function create (data: DataClient) {
    const keyChanges = await KeyChangeController.create(data)

    return {
        get:            get(keyChanges),
        getAll:         getAll(keyChanges),
        update:         update(keyChanges),
        insert:         insert(keyChanges),
        deleteKeyChange: deleteKeyChange(keyChanges)
    }
}

export default {create}
