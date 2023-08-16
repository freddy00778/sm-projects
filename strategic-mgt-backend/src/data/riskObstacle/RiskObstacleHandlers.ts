import {DataClient} from '../index'
import RiskObstacleController, {Controller} from './RiskObstacleController'
import {GetInput} from "./RiskObstacleData";

export const get = (riskObstacles: Controller) => async (input: GetInput) => {
    return riskObstacles.get(input)
}

export const getAll = (riskObstacles: Controller) => async (input: GetInput) => {
    return riskObstacles.getAll(input)
}

export const update = (riskObstacles: Controller) => async (input: GetInput) => {
    return riskObstacles.update(input)
}

export const insert = (riskObstacles: Controller) => async (input: GetInput) => {
    return riskObstacles.insert(input)
}

export const deleteRiskObstacle = (riskObstacles: Controller) => async (input: GetInput) => {
    return riskObstacles.deleteRiskObstacle(input)
}

export async function create (data: DataClient) {
    const riskObstacles = await RiskObstacleController.create(data)

    return {
        get: get(riskObstacles),
        getAll: getAll(riskObstacles),
        update: update(riskObstacles),
        insert: insert(riskObstacles),
        deleteRiskObstacle: deleteRiskObstacle(riskObstacles)
    }
}

export default {create}
