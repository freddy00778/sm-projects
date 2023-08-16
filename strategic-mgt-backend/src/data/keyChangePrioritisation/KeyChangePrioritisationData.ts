/* tslint:disable await-promise */
import { QueryBuilder } from 'knex'

import { DataClient } from '../index'
import { Database } from '../../config'

export interface KeyChangePrioritisation {
  id?: string
  prioritisation_level?: string
  key_change_id?: string
}

export interface DataPrioritisation {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deletePrioritisation: ReturnType<typeof deletePrioritisation>,
}

export interface GetInput {
  id?: string
  prioritisation_level?: string
  key_change_id?: string
}

export const get = (keyChangePrioritisations: () => QueryBuilder) => async (input: GetInput) => {
  return keyChangePrioritisations().select().where(input).first()
}

export const getAll = (keyChangePrioritisations: () => QueryBuilder) => async (input: GetInput) => {
  return keyChangePrioritisations().select().where(input)
}

export const insert = (keyChangePrioritisations: () => QueryBuilder) => async (input: GetInput) => {
  return (await keyChangePrioritisations().insert(input, ['id']) as [{ id: string }])[0]
}

export const update = (keyChangePrioritisations: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change prioritisation.");
  }

  return (await keyChangePrioritisations().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
}

export const deletePrioritisation = (keyChangePrioritisations: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change prioritisation.");
  }

  return (await keyChangePrioritisations().where({ id }).del() as number);
}

export async function create(data: DataClient): Promise<DataPrioritisation> {
  const keyChangePrioritisations = () => data.postgres.withSchema(Database.schema).table('KeyChangePrioritisation')

  return {
    get: get(keyChangePrioritisations),
    getAll: getAll(keyChangePrioritisations),
    update: update(keyChangePrioritisations),
    insert: insert(keyChangePrioritisations),
    deletePrioritisation: deletePrioritisation(keyChangePrioritisations),
  }
}

export default { create }
