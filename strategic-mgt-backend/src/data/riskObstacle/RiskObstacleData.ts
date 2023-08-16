/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface RiskObstacle {
  id: string
  key_change_id: string
  obstacle_description: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteRiskObstacle: ReturnType<typeof deleteRiskObstacle>,
}

export interface GetInput {
  id?: string
  key_change_id?: string
  obstacle_description?: string
}

export const get = (riskObstacles: () => QueryBuilder) => async (input: GetInput) => {
  return riskObstacles().select().where(input).first()
}

export const getAll = (riskObstacles: () => QueryBuilder) => async (input: GetInput) => {
  return riskObstacles().select().where(input)
}

export const insert = (riskObstacles: () => QueryBuilder) => async (input: GetInput) => {
  return (await riskObstacles().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (riskObstacles: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a risk obstacle.");
  }

  return (await riskObstacles().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteRiskObstacle = (riskObstacles: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a risk obstacle.");
  }

  return (await riskObstacles().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const riskObstacles = () => data.postgres.withSchema(Database.schema).table('RiskObstacle')

  return {
    get:           get(riskObstacles),
    getAll:        getAll(riskObstacles),
    update:        update(riskObstacles),
    insert:        insert(riskObstacles),
    deleteRiskObstacle: deleteRiskObstacle(riskObstacles),
  }
}

export default {create}
