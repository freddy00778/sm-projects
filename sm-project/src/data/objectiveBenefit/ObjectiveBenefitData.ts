/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface ObjectiveBenefit {
  id?: string
  objective_id?: string
  benefit_id?: string
  key_change_id?: string
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
  objective_id?: string
  benefit_id?: string
  key_change_id?: string
}

export const get = (benefits: () => QueryBuilder) => async (input: GetInput) => {

  return  benefits().select().where(input).first()
}

export const getAll = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  const query = benefits().select("ObjectiveBenefit.*","Benefit.change_benefit", "Benefit.measured_benefit").from('ObjectiveBenefit')
      .leftJoin('Benefit', 'Benefit.id', 'ObjectiveBenefit.benefit_id')
  if (input) query.where(input)

  return (await query.orderBy("Benefit.created_at", "asc"))
}

export const insert = (benefits: () => QueryBuilder) => async (input: GetInput) => {
  return  (await benefits().insert(input, ['id']) as [{id: string}])[0]
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
  const benefits = () => data.postgres.withSchema(Database.schema).table('ObjectiveBenefit')

  return {
    get:              get(benefits),
    getAll:           getAll(benefits),
    update:           update(benefits),
    insert:           insert(benefits),
    deleteBenefit:    deleteBenefit(benefits),
  }
}

export default {create}
