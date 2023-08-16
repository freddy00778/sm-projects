/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface DecisionRegister {
  id: string
  decision_description?: string;
  date1?: string;
  topic?: string
  context: string
  forum: string
  department: string
  date2: string
  approved_by: string
  nextStep: string
  comments: string
  actioned_by: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteScope: ReturnType<typeof deleteScope>,
}

export interface GetInput {
  id: string
  decision_description?: string;
  date1?: string;
  topic?: string
  context?: string
  forum?: string
  department?: string
  date2?: string
  approved_by?: string
  nextStep?: string
  comments?: string
  actioned_by?: string
}

export const get = (query: () => QueryBuilder) => async (input: GetInput) => {
  return  query().select().where(input).first()
}

export const getAll = (query: () => QueryBuilder) => async (input?: GetInput) => {
  const queries =  query().select()

  if (input){
    queries.where(input)
  }

  return queries.orderBy("created_at", "DESC")
}

export const insert = (query: () => QueryBuilder) => async (input: GetInput) => {
  return  (await query().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (query: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a decision register.");
  }

  return (await query().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteScope = (query: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a decision register.");
  }

  return (await query().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const scopes = () => data.postgres.withSchema(Database.schema).table('DecisionRegister')

  return {
    get:          get(scopes),
    getAll:       getAll(scopes),
    update:       update(scopes),
    insert:       insert(scopes),
    deleteScope:  deleteScope(scopes),
  }
}

export default {create}