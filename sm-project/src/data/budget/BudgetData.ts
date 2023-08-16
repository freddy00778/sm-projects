import { QueryBuilder } from 'knex'
import { DataClient } from '../index'
import { Database } from '../../config'

export interface Budget {
  id?: string
  budget_item_id?: string
  do_we_need_it?: string
  how_many_people?: string
  what_do_we_expect_it_to_cost?: number
  allocated_budget?: number
  actual_spend?: number
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteBudget: ReturnType<typeof deleteBudget>,
}

export interface GetInput {
  id?: string
  budget_item_id?: string
  do_we_need_it?: string
  how_many_people?: string
  what_do_we_expect_it_to_cost?: number
  allocated_budget?: number
  actual_spend?: number
  project_id?: string
}

export const get = (budgets: () => QueryBuilder) => async (input: GetInput) => {
  return budgets().select().where(input).first()
}

export const getAll = (budgets: () => QueryBuilder) => async (input: GetInput) => {

  const query = budgets().select("Budget.*", "BudgetItem.name", "BudgetItem.id as budget_item_id").from('Budget')
       .leftJoin('BudgetItem', 'Budget.budget_item_id', 'BudgetItem.id')

  if (input && input.project_id) {
    query.where('Budget.project_id', input.project_id);
  }

  if (input && !input.project_id) query.where(input)

  return  query.orderBy("created_at", "desc")
}

export const insert = (budgets: () => QueryBuilder) => async (input: GetInput) => {
  return (await budgets().insert(input, ['id']) as [{ id: string, name: string }])[0]
}

export const update = (budgets: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await budgets().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
}

export const deleteBudget = (budgets: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a key change.");
  }

  return (await budgets().where({ id }).del() as number);
}

export async function create(data: DataClient): Promise<Data> {
  const budgets = () => data.postgres.withSchema(Database.schema).table('Budget')

  return {
    get: get(budgets),
    getAll: getAll(budgets),
    update: update(budgets),
    insert: insert(budgets),
    deleteBudget: deleteBudget(budgets),
  }
}

export default { create }
