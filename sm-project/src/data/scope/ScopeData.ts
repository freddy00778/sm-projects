/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Scope {
  id: string
  description?: string
  project_id?: string
  in_scope?: boolean
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteScope: ReturnType<typeof deleteScope>,
}

export interface GetInput {
  id?: string
  description?: string
  project_id?: string
  in_scope?: boolean
}

export const get = (scopes: () => QueryBuilder) => async (input: GetInput) => {
  return  scopes().select().where(input).first()
}

export const getAll = (scopes: () => QueryBuilder) => async (input: GetInput) => {
  return  scopes().select().where(input).orderBy("created_at", "desc")
}

export const insert = (scopes: () => QueryBuilder) => async (input: GetInput) => {
  return  (await scopes().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (scopes: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a scope.");
  }

  return (await scopes().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteScope = (projects: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a scope.");
  }

  return (await projects().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const scopes = () => data.postgres.withSchema(Database.schema).table('Scope')

  return {
    get:          get(scopes),
    getAll:       getAll(scopes),
    update:       update(scopes),
    insert:       insert(scopes),
    deleteScope:  deleteScope(scopes),
  }
}

export default {create}