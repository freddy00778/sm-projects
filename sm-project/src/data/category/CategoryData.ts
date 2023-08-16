/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Category {
  id: string
  name?: string;
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteCategory: ReturnType<typeof deleteCategory>,
}

export interface GetInput {
  id?: string
  name?: string;
}

export const get = (categories: () => QueryBuilder) => async (input: GetInput) => {
  return  categories().select().where(input).first()
}

export const getAll = (categories: () => QueryBuilder) => async (input: GetInput) => {
  return  categories().select().where(input)
}

export const insert = (categories: () => QueryBuilder) => async (input: GetInput) => {
  return  (await categories().insert(input, ['id', "name"]) as [{id: string, name:string}])[0]
}

export const update = (categories: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a category.");
  }

  return (await categories().where({ id }).update(updateFields, ['id', 'name']) as [{id: string, name:string}])[0];
}

export const deleteCategory = (categories: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a category.");
  }

  return (await categories().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const categories = () => data.postgres.withSchema(Database.schema).table('Category')

  return {
    get:          get(categories),
    getAll:       getAll(categories),
    update:       update(categories),
    insert:       insert(categories),
    deleteCategory:  deleteCategory(categories),
  }
}

export default {create}