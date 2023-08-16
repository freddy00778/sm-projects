/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Stakeholder {
  id?: string
  impacted_parties?: string
  key_change_id?: string
  necessary_information?: string
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteStakeholder: ReturnType<typeof deleteStakeholder>,
}

export interface GetInput {
  id?: string
  impacted_parties?: string
  key_change_id?: string
  necessary_information?: string
  project_id?: string
}

export const get = (stakeholders: () => QueryBuilder) => async (input: GetInput) => {
  return  stakeholders().select().where(input).first()
}

export const getAll = (stakeholders: () => QueryBuilder) => async (input: GetInput) => {
  return  stakeholders().select().where(input)
}

export const insert = (stakeholders: () => QueryBuilder) => async (input: GetInput) => {
  return  (await stakeholders().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (stakeholders: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await stakeholders().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteStakeholder = (stakeholders: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change.");
  }

  return (await stakeholders().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const stakeholders = () => data.postgres.withSchema(Database.schema).table('Stakeholder')

  return {
    get:              get(stakeholders),
    getAll:           getAll(stakeholders),
    update:           update(stakeholders),
    insert:           insert(stakeholders),
    deleteStakeholder:  deleteStakeholder(stakeholders),
  }
}

export default {create}
