/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface KeyChangeDepartment {
  id?: string
  department_id?: string
  key_change_id?: string
  necessary_information?: string
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteKeyChangeDepartment: ReturnType<typeof deleteKeyChangeDepartment>,
}

export interface GetInput {
  id?: string
  department_id?: string
  key_change_id?: string
  necessary_information?: string
  project_id?: string
}

export const get = (keychangeDepartments: () => QueryBuilder) => async (input: GetInput) => {
  return  keychangeDepartments().select().where(input).first()
}

export const getAll = (stakeholderDepartments: () => QueryBuilder) => async (input: GetInput) => {

  return  stakeholderDepartments().select('KeyChangeDepartment.*',"Department.name")
      .from('KeyChangeDepartment')
      .leftJoin('Department', 'Department.id', 'KeyChangeDepartment.department_id')
      .where(input)

  // return  stakeholderDepartments().select().where(input)
}

export const insert = (stakeholderDepartments: () => QueryBuilder) => async (input: GetInput) => {
  return  (await stakeholderDepartments().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (stakeholderDepartments: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await stakeholderDepartments().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteKeyChangeDepartment = (stakeholderDepartments: () => QueryBuilder) => async (input: GetInput) => {
  const { key_change_id, project_id, department_id } = input;

  if (!key_change_id && !project_id && !department_id) {
    throw new Error("At least one criteria (key_change_id, project_id, or department_id) must be provided to delete a key change.");
  }

  const deleteCriteria: any = {};

  if (key_change_id) {
    deleteCriteria.key_change_id = key_change_id;
  }

  if (project_id) {
    deleteCriteria.project_id = project_id;
  }

  if (department_id) {
    deleteCriteria.department_id = department_id;
  }

  console.log("Deleting with criteria:", deleteCriteria);
  return (await stakeholderDepartments().where(deleteCriteria).del() as number);
}


export async function create (data: DataClient): Promise<Data> {
  const keyChangeDepartments = () => data.postgres.withSchema(Database.schema).table('KeyChangeDepartment')

  return {
    get:              get(keyChangeDepartments),
    getAll:           getAll(keyChangeDepartments),
    update:           update(keyChangeDepartments),
    insert:           insert(keyChangeDepartments),
    deleteKeyChangeDepartment:  deleteKeyChangeDepartment(keyChangeDepartments),
  }
}

export default {create}
