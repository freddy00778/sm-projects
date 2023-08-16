import RiskObstacleData, {Data, GetInput} from './RiskObstacleData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteRiskObstacle: ReturnType<typeof deleteRiskObstacle>,
}

export const get = (riskObstacles: Data) => async (input: GetInput) => {
    return riskObstacles.get(input)
}

export const getAll = (riskObstacles: Data) => async (input: GetInput) => {
    return riskObstacles.getAll(input)
}

export const update = (riskObstacles: Data) => async (input: GetInput) => {
    return riskObstacles.update(input)
}

export const insert = (riskObstacles: Data) => async (input: GetInput) => {
    return riskObstacles.insert(input)
}

export const deleteRiskObstacle = (riskObstacles: Data) => async (input: GetInput) => {
    return riskObstacles.deleteRiskObstacle(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const riskObstacles = await RiskObstacleData.create(data)

    return {
        get: get(riskObstacles),
        getAll: getAll(riskObstacles),
        update: update(riskObstacles),
        insert: insert(riskObstacles),
        deleteRiskObstacle: deleteRiskObstacle(riskObstacles),
    }
}

export default {create}
