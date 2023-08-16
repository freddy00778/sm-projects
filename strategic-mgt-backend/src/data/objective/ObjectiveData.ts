/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Objective {
  id?: string
  desired_out_come?: string
  implementation_risk?: string
  key_change_id?: string
  project_id?: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteObjective: ReturnType<typeof deleteObjective>,
}

export interface GetInput {
  id?: string
  desired_out_come?: string
  implementation_risk?: string
  key_change_id?: string
  project_id?: string
}

export const get = (objectives: () => QueryBuilder) => async (input: GetInput) => {
  return  objectives().select().where(input).first()
}

export const getAll = (objectives: () => QueryBuilder) => async (input: GetInput) => {
  return  objectives().select().where(input)
}

export const insert = (objectives: () => QueryBuilder) => async (input: GetInput) => {
  return  (await objectives().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (objectives: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await objectives().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteObjective = (objectives: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change.");
  }

  return (await objectives().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const objectives = () => data.postgres.withSchema(Database.schema).table('Objective')

  return {
    get:              get(objectives),
    getAll:           getAll(objectives),
    update:           update(objectives),
    insert:           insert(objectives),
    deleteObjective:  deleteObjective(objectives),
  }
}

export default {create}
