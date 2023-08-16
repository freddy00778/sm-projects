/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface ChangeApproach {
  id?: string
  type?: string
  complexity_of_change?: string
  change_readiness_start_up?: string
  change_readiness_implementation?: string
  change_readiness_anchoring?: string
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteChangeApproach: ReturnType<typeof deleteChangeApproach>,
}

export interface GetInput {
  id?: string
  type?: string
  complexity_of_change?: string
  change_readiness_start_up?: string
  change_readiness_implementation?: string
  change_readiness_anchoring?: string
  project_id?: string
}

export const get = (changeApproaches: () => QueryBuilder) => async (input: GetInput) => {
  return  changeApproaches().select().where(input).first()
}

export const getAll = (changeApproaches: () => QueryBuilder) => async (input: GetInput) => {
  return  changeApproaches().select().where(input)
}

export const insert = (changeApproaches: () => QueryBuilder) => async (input: GetInput) => {
  return  (await changeApproaches().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (changeApproaches: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await changeApproaches().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteChangeApproach = (changeApproaches: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change.");
  }

  return (await changeApproaches().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const changeApproaches = () => data.postgres.withSchema(Database.schema).table('ChangeApproach')

  return {
    get:              get(changeApproaches),
    getAll:           getAll(changeApproaches),
    update:           update(changeApproaches),
    insert:           insert(changeApproaches),
    deleteChangeApproach:  deleteChangeApproach(changeApproaches),
  }
}

export default {create}
