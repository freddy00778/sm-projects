import ObjectiveBenefitData , {Data, GetInput} from './ObjectiveBenefitData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteBenefit: ReturnType<typeof deleteBenefit>,
}

export const get = (benefits: Data) => async (input: GetInput) => {
    return benefits.get(input)
}

export const getAll = (benefits: Data) => async (input: GetInput) => {
    return benefits.getAll(input)
}

export const update = (benefits: Data) => async (input: GetInput) => {
    return benefits.update(input)
}

export const insert = (benefits: Data) => async (input: GetInput) => {
    return benefits.insert(input)
}

export const deleteBenefit = (benefits: Data) => async (input: GetInput) => {
    return benefits.deleteBenefit(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const benefits = await ObjectiveBenefitData.create(data)

    return {
        get: get(benefits),
        getAll: getAll(benefits),
        update: update(benefits),
        insert: insert(benefits),
        deleteBenefit: deleteBenefit(benefits),
    }
}

export default {create}
