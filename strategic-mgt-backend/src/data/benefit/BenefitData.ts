/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Benefit {
  id?: string
  change_benefit?: string
  measured_benefit?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteBenefit: ReturnType<typeof deleteBenefit>,
}

export interface GetInput {
  id?: string
  change_benefit?: string
  measured_benefit?: string
}

export const get = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  return  benefits().select().where(input).first()
}

export const getAll = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  return  benefits().select().where(input)
}

export const insert = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  return  (await benefits().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await benefits().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteBenefit = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change.");
  }

  return (await benefits().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const benefits = () => data.postgres.withSchema(Database.schema).table('Benefit')

  return {
    get:              get(benefits),
    getAll:           getAll(benefits),
    update:           update(benefits),
    insert:           insert(benefits),
    deleteBenefit:    deleteBenefit(benefits),
  }
}

export default {create}
