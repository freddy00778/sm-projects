/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface HighLevelPlan {
  id: string
  project_id?: string;
  description?: string;
  order: number
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deletePlans: ReturnType<typeof deletePlans>,
}

export interface GetInput {
  id?: string
  project_id?: string;
  description?: string;
  order?: number;
}

export const get = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  queryBuilder().select().where(input).first()
}

export const getAll = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  queryBuilder().select().where(input)
}

export const insert = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  return  (await queryBuilder().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a plan.");
  }

  return (await queryBuilder().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deletePlans = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a plan.");
  }

  return (await queryBuilder().where({ project_id: id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const plans = () => data.postgres.withSchema(Database.schema).table('HighLevelPlan')

  return {
    get:          get(plans),
    getAll:       getAll(plans),
    update:       update(plans),
    insert:       insert(plans),
    deletePlans:  deletePlans(plans),
  }
}

export default {create}