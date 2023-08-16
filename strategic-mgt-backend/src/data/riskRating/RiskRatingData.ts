/* tslint:disable await-promise */
import { QueryBuilder } from 'knex'

import { DataClient } from '../index'
import { Database } from '../../config'

export interface RiskRating {
  id?: string
  risk_category?: string
  risk_severity?: string
  risk_occurrence_probability?: string
  key_change_id?: string
}

export interface DataRating {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteRiskRating: ReturnType<typeof deleteRiskRating>,
}

export interface GetInput {
  id?: string
  risk_category?: string
  risk_severity?: string
  risk_occurrence_probability?: string
  key_change_id?: string
}

export const get = (riskRatings: () => QueryBuilder) => async (input: GetInput) => {
  return riskRatings().select().where(input).first()
}

export const getAll = (riskRatings: () => QueryBuilder) => async (input: GetInput) => {
  return riskRatings().select().where(input)
}

export const insert = (riskRatings: () => QueryBuilder) => async (input: GetInput) => {
  return (await riskRatings().insert(input, ['id']) as [{ id: string }])[0]
}

export const update = (riskRatings: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a risk rating.");
  }

  return (await riskRatings().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
}

export const deleteRiskRating = (riskRatings: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a risk rating.");
  }

  return (await riskRatings().where({ id }).del() as number);
}

export async function create(data: DataClient): Promise<DataRating> {
  const riskRatings = () => data.postgres.withSchema(Database.schema).table('RiskRating')

  return {
    get: get(riskRatings),
    getAll: getAll(riskRatings),
    update: update(riskRatings),
    insert: insert(riskRatings),
    deleteRiskRating: deleteRiskRating(riskRatings),
  }
}

export default { create }
