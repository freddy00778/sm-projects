/* tslint:disable await-promise */
import { QueryBuilder } from 'knex'

import { DataClient } from '../index'
import { Database } from '../../config'

export interface RiskLever {
  id: string
  key_change_id: string
  lever_description: string
}

export interface DataLever {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteRiskLever: ReturnType<typeof deleteRiskLever>,
}

export interface GetInput {
  id?: string
  key_change_id?: string
  lever_description?: string
}

export const get = (riskLevers: () => QueryBuilder) => async (input: GetInput) => {
  return riskLevers().select().where(input).first()
}

export const getAll = (riskLevers: () => QueryBuilder) => async (input: GetInput) => {
  return riskLevers().select().where(input)
}

export const insert = (riskLevers: () => QueryBuilder) => async (input: GetInput) => {
  return (await riskLevers().insert(input, ['id']) as [{ id: string }])[0]
}

export const update = (riskLevers: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a risk lever.");
  }

  return (await riskLevers().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
}

export const deleteRiskLever = (riskLevers: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a risk lever.");
  }

  return (await riskLevers().where({ id }).del() as number);
}

export async function create(data: DataClient): Promise<DataLever> {
  const riskLevers = () => data.postgres.withSchema(Database.schema).table('RiskLever')

  return {
    get: get(riskLevers),
    getAll: getAll(riskLevers),
    update: update(riskLevers),
    insert: insert(riskLevers),
    deleteRiskLever: deleteRiskLever(riskLevers),
  }
}

export default { create }
