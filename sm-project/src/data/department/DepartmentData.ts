/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Department {
  id: string
  name?: string
  department_id?: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteDepartment: ReturnType<typeof deleteDepartment>,
}

export interface GetInput {
  id?: string
  name?: string
  organisation_id?: string
}

export const get = (departments: () => QueryBuilder) => async (input: GetInput) => {
  return  departments().select().where(input).first()
}

export const getAll = (departments: () => QueryBuilder) => async (input: GetInput) => {
  return  departments().select().where(input)
}

export const insert = (departments: () => QueryBuilder) => async (input: GetInput) => {
  return  (await departments().insert(input, ['id', "name"]) as [{id: string, name:string}])[0]
}

export const update = (departments: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a category.");
  }

  return (await departments().where({ id }).update(updateFields, ['id', 'name']) as [{id: string, name:string}])[0];
}

export const deleteDepartment = (departments: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a department.");
  }

  return (await departments().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const departments = () => data.postgres.withSchema(Database.schema).table('Department')

  return {
    get:          get(departments),
    getAll:       getAll(departments),
    update:       update(departments),
    insert:       insert(departments),
    deleteDepartment:  deleteDepartment(departments),
  }
}

export default {create}