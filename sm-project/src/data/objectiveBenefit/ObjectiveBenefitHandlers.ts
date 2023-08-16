import {DataClient} from '../index'
import ObjectiveBenefitController, {Controller} from './ObjectiveBenefitController'
import  {GetInput} from "./ObjectiveBenefitData";

export const get = (benefit: Controller) => async (input: GetInput) => {
    return benefit.get(input)
}

export const getAll = (benefit: Controller) => async (input: GetInput) => {
    return benefit.getAll(input)
}

export const update = (benefit: Controller) => async (input: GetInput) => {
    return benefit.update(input)
}

export const insert = (benefit: Controller) => async (input: GetInput) => {
    return benefit.insert(input)
}

export const deleteBenefit = (benefit: Controller) => async (input: GetInput) => {
    return benefit.deleteBenefit(input)
}

export async function create (data: DataClient) {
    const benefits = await ObjectiveBenefitController.create(data)

    return {
        get:            get(benefits),
        getAll:         getAll(benefits),
        update:         update(benefits),
        insert:         insert(benefits),
        deleteBenefit:  deleteBenefit(benefits)
    }
}

export default {create}
