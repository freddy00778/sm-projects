/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface KeyChange {
  id?: string
  title?: string
  value?: string
  as_is?: string
  to_be?: string
  project_id?: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteKeyChange: ReturnType<typeof deleteKeyChange>,
}

export interface GetInput {
  id?: string
  title?: string
  value?: string
  as_is?: string
  to_be?: string
  project_id?: string
}

export const get = (keyChanges: () => QueryBuilder) => async (input: GetInput) => {
  return  keyChanges().select().where(input).first()
}

export const getAll = (keyChanges: () => QueryBuilder) => async (input: GetInput) => {
  return  keyChanges().select().where(input).orderBy("created_at", "DESC")
}

export const insert = (keyChanges: () => QueryBuilder) => async (input: GetInput) => {
  return  (await keyChanges().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (keyChanges: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await keyChanges().where({ id }).update(updateFields, ['id']) as [{id: string, name:string}])[0];
}

export const deleteKeyChange = (keyChanges: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change.");
  }

  return (await keyChanges().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const keyChanges = () => data.postgres.withSchema(Database.schema).table('KeyChange')

  return {
    get:          get(keyChanges),
    getAll:       getAll(keyChanges),
    update:       update(keyChanges),
    insert:       insert(keyChanges),
    deleteKeyChange:  deleteKeyChange(keyChanges),
  }
}

export default {create}
