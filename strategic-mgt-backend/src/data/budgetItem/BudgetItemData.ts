import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface BudgetItem {
  id?: string
  name?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteBudgetItem: ReturnType<typeof deleteBudgetItem>,
}

export interface GetInput {
  id?: string
  name?: string
}

export const get = (budgetItems: () => QueryBuilder) => async (input: GetInput) => {
  return budgetItems().select().where(input).first()
}

export const getAll = (budgetItems: () => QueryBuilder) => async (input: GetInput) => {
  return budgetItems().select().where(input)
}

export const insert = (budgetItems: () => QueryBuilder) => async (input: GetInput) => {
  return (await budgetItems().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (budgetItems: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a budget item.");
  }

  return (await budgetItems().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteBudgetItem = (budgetItems: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a budget item.");
  }

  return (await budgetItems().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const budgetItems = () => data.postgres.withSchema(Database.schema).table('BudgetItem')

  return {
    get:              get(budgetItems),
    getAll:           getAll(budgetItems),
    update:           update(budgetItems),
    insert:           insert(budgetItems),
    deleteBudgetItem: deleteBudgetItem(budgetItems),
  }
}

export default {create}
